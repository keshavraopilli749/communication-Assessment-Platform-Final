#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up CommQuest Backend...\n');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file from .env.example...');
  try {
    fs.copyFileSync('.env.example', '.env');
    console.log('✅ .env file created successfully');
  } catch (error) {
    console.log('❌ Failed to create .env file:', error.message);
  }
} else {
  console.log('✅ .env file already exists');
}

// Check if uploads directory exists
if (!fs.existsSync('uploads')) {
  console.log('📁 Creating uploads directory...');
  try {
    fs.mkdirSync('uploads', { recursive: true });
    console.log('✅ uploads directory created');
  } catch (error) {
    console.log('❌ Failed to create uploads directory:', error.message);
  }
} else {
  console.log('✅ uploads directory already exists');
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.log('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed');
}

// Generate Prisma client
console.log('🔧 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');
} catch (error) {
  console.log('❌ Failed to generate Prisma client:', error.message);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Update your .env file with your database URL and other settings');
console.log('2. Make sure PostgreSQL is running');
console.log('3. Run: npm run db:migrate (to create database tables)');
console.log('4. Run: npm run db:seed (to populate with sample data)');
console.log('5. Run: npm run dev (to start the development server)');
console.log('\n📚 Check README.md for detailed setup instructions');
console.log('🔗 API will be available at: http://localhost:5000');
console.log('📊 Health check: http://localhost:5000/health');
