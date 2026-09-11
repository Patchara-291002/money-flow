import prisma from '../src/lib/prisma'

const baseCategories = [
  { name: 'อาหารและเครื่องดื่ม', icon: '🍽️', color: '#F59E0B' },
  { name: 'เดินทาง/น้ำมัน/ทางด่วน', icon: '🚗', color: '#3B82F6' },
  { name: 'ที่พัก/ค่าเช่า', icon: '🏠', color: '#8B5CF6' },
  { name: 'บิล/สาธารณูปโภค', icon: '💡', color: '#EAB308' },
  { name: 'ช้อปปิ้ง/ของใช้', icon: '🛍️', color: '#EC4899' },
  { name: 'สุขภาพ/ประกัน', icon: '💊', color: '#10B981' },
  { name: 'บันเทิง/ท่องเที่ยว', icon: '🎬', color: '#6366F1' },
  { name: 'การศึกษา', icon: '📚', color: '#0EA5E9' },
  { name: 'ผ่อนชำระ/หนี้สิน', icon: '💳', color: '#EF4444' },
  { name: 'ออมเงิน/ลงทุน', icon: '💰', color: '#22C55E' },
  { name: 'อื่นๆ', icon: '📦', color: '#6B7280' },
]

async function main() {
  for (const category of baseCategories) {
    const existing = await prisma.category.findFirst({ where: { name: category.name } })
    if (existing) {
      await prisma.category.update({ where: { id: existing.id }, data: category })
    } else {
      await prisma.category.create({ data: category })
    }
  }
  console.log(`Seeded ${baseCategories.length} base categories`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
