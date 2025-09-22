/*
  # Initial Database Schema

  1. New Tables
    - `users` - Core user accounts (Admin, Vendor, Customer)
    - `vendors` - Vendor/shop profiles with location data
    - `service_categories` - Service categories (Hair, Makeup, etc.)
    - `services` - Services offered by vendors
    - `service_category_map` - Many-to-many mapping between services and categories
    - `addons` - Additional services/add-ons
    - `service_addons` - Many-to-many mapping between services and addons
    - `vendor_slots` - Available time slots for bookings
    - `bookings` - Customer bookings with scheduling and pricing
    - `booking_items` - Individual services in a booking
    - `booking_item_addons` - Add-ons for booking items
    - `payments` - Payment records with gateway integration
    - `reviews` - Customer reviews and ratings
    - `addresses` - Customer addresses for service delivery
    - `media` - File storage for images, documents
    - `coupons` - Discount coupons and promotions
    - `booking_events` - Audit trail for booking changes
    - `audit_logs` - System-wide audit logging

  2. Security
    - Enable proper indexing for performance
    - Geo-spatial indexing for location-based queries
    - Foreign key constraints for data integrity

  3. Features
    - Role-based access control (Admin, Vendor, Customer)
    - Geo-location support for nearby vendor search
    - Flexible pricing with discounts and taxes
    - Comprehensive booking lifecycle management
    - Payment gateway integration ready
    - Review and rating system
    - Audit trail for compliance
*/

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  id VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191) NULL,
  `password` VARCHAR(191) NOT NULL,
  `firstName` VARCHAR(191) NOT NULL,
  `lastName` VARCHAR(191) NOT NULL,
  `role` ENUM('ADMIN', 'VENDOR', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
  `status` ENUM('ACTIVE', 'SUSPENDED', 'PENDING') NOT NULL DEFAULT 'ACTIVE',
  `avatar` VARCHAR(191) NULL,
  `fcmToken` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_key` (`email`),
  UNIQUE INDEX `users_phone_key` (`phone`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Vendors table
CREATE TABLE IF NOT EXISTS `vendors` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `shopName` VARCHAR(191) NOT NULL,
  `description` TEXT NULL,
  `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED') NOT NULL DEFAULT 'PENDING',
  `businessLicense` VARCHAR(191) NULL,
  `taxId` VARCHAR(191) NULL,
  `latitude` DECIMAL(10, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL,
  `address` VARCHAR(191) NOT NULL,
  `city` VARCHAR(191) NOT NULL,
  `state` VARCHAR(191) NOT NULL,
  `zipCode` VARCHAR(191) NOT NULL,
  `mondayHours` VARCHAR(191) NULL,
  `tuesdayHours` VARCHAR(191) NULL,
  `wednesdayHours` VARCHAR(191) NULL,
  `thursdayHours` VARCHAR(191) NULL,
  `fridayHours` VARCHAR(191) NULL,
  `saturdayHours` VARCHAR(191) NULL,
  `sundayHours` VARCHAR(191) NULL,
  `serviceRadius` INTEGER NOT NULL DEFAULT 5,
  `advanceBooking` INTEGER NOT NULL DEFAULT 7,
  `cancellation` INTEGER NOT NULL DEFAULT 24,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `vendors_userId_key` (`userId`),
  INDEX `vendors_latitude_longitude_idx` (`latitude`, `longitude`),
  CONSTRAINT `vendors_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Service Categories table
CREATE TABLE IF NOT EXISTS `service_categories` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NULL,
  `icon` VARCHAR(191) NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `service_categories_name_key` (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Services table
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(191) NOT NULL,
  `vendorId` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` TEXT NULL,
  `duration` INTEGER NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `image` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `services_vendorId_idx` (`vendorId`),
  CONSTRAINT `services_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Service Category Mapping table
CREATE TABLE IF NOT EXISTS `service_category_map` (
  `id` VARCHAR(191) NOT NULL,
  `serviceId` VARCHAR(191) NOT NULL,
  `categoryId` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `service_category_map_serviceId_categoryId_key` (`serviceId`, `categoryId`),
  CONSTRAINT `service_category_map_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `service_category_map_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `service_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Addons table
CREATE TABLE IF NOT EXISTS `addons` (
  `id` VARCHAR(191) NOT NULL,
  `vendorId` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `duration` INTEGER NOT NULL DEFAULT 0,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `addons_vendorId_idx` (`vendorId`),
  CONSTRAINT `addons_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Service Addons mapping table
CREATE TABLE IF NOT EXISTS `service_addons` (
  `id` VARCHAR(191) NOT NULL,
  `serviceId` VARCHAR(191) NOT NULL,
  `addonId` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `service_addons_serviceId_addonId_key` (`serviceId`, `addonId`),
  CONSTRAINT `service_addons_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `service_addons_addonId_fkey` FOREIGN KEY (`addonId`) REFERENCES `addons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Vendor Slots table
CREATE TABLE IF NOT EXISTS `vendor_slots` (
  `id` VARCHAR(191) NOT NULL,
  `vendorId` VARCHAR(191) NOT NULL,
  `date` DATE NOT NULL,
  `startTime` VARCHAR(191) NOT NULL,
  `endTime` VARCHAR(191) NOT NULL,
  `status` ENUM('AVAILABLE', 'BOOKED', 'BLOCKED') NOT NULL DEFAULT 'AVAILABLE',
  `bookingId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `vendor_slots_vendorId_date_startTime_key` (`vendorId`, `date`, `startTime`),
  UNIQUE INDEX `vendor_slots_bookingId_key` (`bookingId`),
  INDEX `vendor_slots_vendorId_date_idx` (`vendorId`, `date`),
  CONSTRAINT `vendor_slots_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Addresses table
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL DEFAULT 'HOME',
  `name` VARCHAR(191) NULL,
  `street` VARCHAR(191) NOT NULL,
  `city` VARCHAR(191) NOT NULL,
  `state` VARCHAR(191) NOT NULL,
  `zipCode` VARCHAR(191) NOT NULL,
  `latitude` DECIMAL(10, 8) NULL,
  `longitude` DECIMAL(11, 8) NULL,
  `isDefault` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `addresses_userId_idx` (`userId`),
  CONSTRAINT `addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bookings table
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` VARCHAR(191) NOT NULL,
  `customerId` VARCHAR(191) NOT NULL,
  `vendorId` VARCHAR(191) NOT NULL,
  `status` ENUM('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
  `scheduledDate` DATE NOT NULL,
  `scheduledTime` VARCHAR(191) NOT NULL,
  `duration` INTEGER NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  `discount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
  `tax` DECIMAL(10, 2) NOT NULL DEFAULT 0,
  `total` DECIMAL(10, 2) NOT NULL,
  `addressId` VARCHAR(191) NOT NULL,
  `notes` TEXT NULL,
  `cancellationReason` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `bookings_customerId_idx` (`customerId`),
  INDEX `bookings_vendorId_idx` (`vendorId`),
  INDEX `bookings_scheduledDate_idx` (`scheduledDate`),
  CONSTRAINT `bookings_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `bookings_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `bookings_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add foreign key constraint for vendor_slots.bookingId
ALTER TABLE `vendor_slots` ADD CONSTRAINT `vendor_slots_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- Booking Items table
CREATE TABLE IF NOT EXISTS `booking_items` (
  `id` VARCHAR(191) NOT NULL,
  `bookingId` VARCHAR(191) NOT NULL,
  `serviceId` VARCHAR(191) NOT NULL,
  `quantity` INTEGER NOT NULL DEFAULT 1,
  `price` DECIMAL(10, 2) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `booking_items_bookingId_idx` (`bookingId`),
  CONSTRAINT `booking_items_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_items_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Booking Item Addons table
CREATE TABLE IF NOT EXISTS `booking_item_addons` (
  `id` VARCHAR(191) NOT NULL,
  `bookingItemId` VARCHAR(191) NOT NULL,
  `addonId` VARCHAR(191) NOT NULL,
  `quantity` INTEGER NOT NULL DEFAULT 1,
  `price` DECIMAL(10, 2) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `booking_item_addons_bookingItemId_idx` (`bookingItemId`),
  CONSTRAINT `booking_item_addons_bookingItemId_fkey` FOREIGN KEY (`bookingItemId`) REFERENCES `booking_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_item_addons_addonId_fkey` FOREIGN KEY (`addonId`) REFERENCES `addons` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Payments table
CREATE TABLE IF NOT EXISTS `payments` (
  `id` VARCHAR(191) NOT NULL,
  `bookingId` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `method` ENUM('CARD', 'UPI', 'WALLET') NOT NULL,
  `status` ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
  `gatewayId` VARCHAR(191) NULL,
  `gatewayResponse` JSON NULL,
  `refundAmount` DECIMAL(10, 2) NULL,
  `refundReason` VARCHAR(191) NULL,
  `refundedAt` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `payments_bookingId_idx` (`bookingId`),
  INDEX `payments_userId_idx` (`userId`),
  CONSTRAINT `payments_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `payments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Reviews table
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` VARCHAR(191) NOT NULL,
  `bookingId` VARCHAR(191) NOT NULL,
  `customerId` VARCHAR(191) NOT NULL,
  `vendorId` VARCHAR(191) NOT NULL,
  `rating` INTEGER NOT NULL,
  `comment` TEXT NULL,
  `response` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `reviews_bookingId_key` (`bookingId`),
  INDEX `reviews_vendorId_idx` (`vendorId`),
  CONSTRAINT `reviews_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `reviews_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `reviews_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Media table
CREATE TABLE IF NOT EXISTS `media` (
  `id` VARCHAR(191) NOT NULL,
  `vendorId` VARCHAR(191) NULL,
  `type` VARCHAR(191) NOT NULL,
  `url` VARCHAR(191) NOT NULL,
  `filename` VARCHAR(191) NOT NULL,
  `mimeType` VARCHAR(191) NOT NULL,
  `size` INTEGER NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `media_vendorId_idx` (`vendorId`),
  CONSTRAINT `media_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Coupons table
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` VARCHAR(191) NOT NULL,
  `code` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NULL,
  `type` VARCHAR(191) NOT NULL,
  `value` DECIMAL(10, 2) NOT NULL,
  `minAmount` DECIMAL(10, 2) NULL,
  `maxDiscount` DECIMAL(10, 2) NULL,
  `usageLimit` INTEGER NULL,
  `usageCount` INTEGER NOT NULL DEFAULT 0,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `validFrom` DATETIME(3) NOT NULL,
  `validUntil` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `coupons_code_key` (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Booking Events table
CREATE TABLE IF NOT EXISTS `booking_events` (
  `id` VARCHAR(191) NOT NULL,
  `bookingId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `data` JSON NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `booking_events_bookingId_idx` (`bookingId`),
  INDEX `booking_events_createdAt_idx` (`createdAt`),
  CONSTRAINT `booking_events_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Audit Logs table
CREATE TABLE IF NOT EXISTS `audit_logs` (
  id VARCHAR(191) NOT NULL,
  userId VARCHAR(191) NULL,
  action VARCHAR(191) NOT NULL,
  resource VARCHAR(191) NOT NULL,
  resourceId VARCHAR(191) NULL,
  oldData JSON NULL,
  newData JSON NULL,
  ipAddress VARCHAR(191) NULL,
  userAgent VARCHAR(191) NULL,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `audit_logs_userId_idx` (`userId`),
  INDEX `audit_logs_createdAt_idx` (`createdAt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert default service categories
INSERT IGNORE INTO `service_categories` (`id`, `name`, `description`, `icon`, `isActive`, `createdAt`, `updatedAt`) VALUES
('cat_hair', 'HAIR', 'Hair styling, cutting, coloring services', '💇‍♀️', true, NOW(), NOW()),
('cat_makeup', 'MAKEUP', 'Professional makeup services', '💄', true, NOW(), NOW()),
('cat_nails', 'NAILS', 'Manicure, pedicure, nail art', '💅', true, NOW(), NOW()),
('cat_skincare', 'SKINCARE', 'Facial treatments, skincare services', '🧴', true, NOW(), NOW()),
('cat_massage', 'MASSAGE', 'Relaxation and therapeutic massage', '💆‍♀️', true, NOW(), NOW());

-- Create admin user (password: admin123)
INSERT IGNORE INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
('admin_001', 'admin@beautybook.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.VpO/iG', 'System', 'Admin', 'ADMIN', 'ACTIVE', NOW(), NOW());
