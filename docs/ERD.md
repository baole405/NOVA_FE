# ERD - Homix

## Overview

Tai lieu nay tham chieu ERD hien co cua he thong Homix.

## ERD Image

![Homix ERD](./image.png)

## Core Entities

- users
- apartments
- bills
- bill_items
- transactions
- bookings
- notifications
- facilities
- fee_types
- announcements
- maintenance_requests
- visitors

## Main Relationships

- users 1-n apartments (owner_id)
- apartments 1-n bills
- bills 1-n bill_items
- bills 1-n transactions
- users 1-n bookings
- users 1-n notifications
- users 1-n maintenance_requests
- users 1-n visitors

## Notes

- Booking status duoc su dung cho moderation flow: pending/confirmed/rejected/cancelled.
- Bills + transactions la truc du lieu cho luong tai chinh.
- Neu schema thay doi, cap nhat lai image va tai lieu nay trong cung PR.
