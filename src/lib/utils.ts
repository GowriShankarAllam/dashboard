import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

// Function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date as "MMM dd, yyyy"
export function formatDate(date: Date | string) {
  return format(new Date(date), 'MMM dd, yyyy');
}

// Format date as "MMM dd, yyyy h:mm a"
export function formatDateTime(date: Date | string) {
  return format(new Date(date), 'MMM dd, yyyy h:mm a');
}

// Format relative time (e.g., "2 days ago")
export function formatRelativeTime(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// Calculate percentage
export function calculatePercentage(value: number, total: number) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Generate random ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Get user role color
export function getRoleColor(role: string) {
  switch (role.toLowerCase()) {
    case 'admin':
      return 'text-purple-600';
    case 'faculty':
      return 'text-blue-600';
    case 'student':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
}

// Format grade
export function formatGrade(score: number, total: number) {
  const percentage = calculatePercentage(score, total);
  
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}