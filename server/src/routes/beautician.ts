import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get beautician dashboard stats
router.get('/dashboard/stats', protect, async (req, res) => {
  try {
    const beauticianId = req.query.beauticianId as string;
    
    if (!beauticianId) {
      return res.status(400).json({ message: 'Beautician ID is required' });
    }

    // Get upcoming appointments
    const upcomingAppointments = await prisma.booking.count({
      where: {
        beauticianId: beauticianId,
        status: {
          in: ['PENDING', 'CONFIRMED']
        },
        scheduledDate: {
          gte: new Date()
        }
      }
    });

    // Get completed services
    const completedServices = await prisma.booking.count({
      where: {
        beauticianId: beauticianId,
        status: 'COMPLETED'
      }
    });

    // Get total earnings
    const totalEarnings = await prisma.booking.aggregate({
      where: {
        beauticianId: beauticianId,
        status: 'COMPLETED'
      },
      _sum: {
        total: true
      }
    });

    const stats = {
      upcomingAppointments,
      completedServices,
      totalEarnings: totalEarnings._sum.total || 0
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching beautician stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get beautician appointments
router.get('/dashboard/appointments', protect, async (req, res) => {
  try {
    const beauticianId = req.query.beauticianId as string;
    
    if (!beauticianId) {
      return res.status(400).json({ message: 'Beautician ID is required' });
    }

    const appointments = await prisma.booking.findMany({
      where: {
        beauticianId: beauticianId
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        vendor: {
          select: {
            shopName: true,
            address: true
          }
        },
        items: {
          include: {
            service: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      },
      orderBy: {
        scheduledDate: 'desc'
      },
      take: 10
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching beautician appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get beautician profile
router.get('/profile/:id', protect, async (req, res) => {
  try {
    const beauticianId = req.params.id;

    const beautician = await prisma.user.findUnique({
      where: {
        id: beauticianId,
        role: 'BEAUTICIAN'
      },
      include: {
        beautician: true
      }
    });

    if (!beautician) {
      return res.status(404).json({ message: 'Beautician not found' });
    }

    res.json(beautician);
  } catch (error) {
    console.error('Error fetching beautician profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update beautician profile
router.put('/profile/:id', protect, async (req, res) => {
  try {
    const beauticianId = req.params.id;
    const { firstName, lastName, phone, city, address, bio, skills, yearsOfExperience } = req.body;

    // Update user data
    const updatedUser = await prisma.user.update({
      where: {
        id: beauticianId,
        role: 'BEAUTICIAN'
      },
      data: {
        firstName,
        lastName,
        phone,
        city,
        address,
        bio
      }
    });

    // Update beautician-specific data if beautician record exists
    if (updatedUser.beautician) {
      await prisma.beautician.update({
        where: {
          userId: beauticianId
        },
        data: {
          skills: skills || [],
          yearsOfExperience
        }
      });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating beautician profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get beautician earnings
router.get('/earnings/:id', protect, async (req, res) => {
  try {
    const beauticianId = req.params.id;
    const { startDate, endDate } = req.query;

    const whereClause: any = {
      beauticianId: beauticianId,
      status: 'COMPLETED'
    };

    if (startDate && endDate) {
      whereClause.scheduledDate = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string)
      };
    }

    const earnings = await prisma.booking.aggregate({
      where: whereClause,
      _sum: {
        total: true
      },
      _count: {
        id: true
      }
    });

    // Get monthly earnings for the last 6 months
    const monthlyEarnings = await prisma.booking.groupBy({
      by: ['scheduledDate'],
      where: {
        beauticianId: beauticianId,
        status: 'COMPLETED',
        scheduledDate: {
          gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) // 6 months ago
        }
      },
      _sum: {
        total: true
      },
      _count: {
        id: true
      }
    });

    res.json({
      totalEarnings: earnings._sum.total || 0,
      totalServices: earnings._count.id || 0,
      monthlyEarnings
    });
  } catch (error) {
    console.error('Error fetching beautician earnings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;