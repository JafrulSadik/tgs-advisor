import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  try {
    const serviceCount = await prisma.service.count();
    const teamMemberCount = await prisma.team.count();
    const galleryImageCount = await prisma.imageGallery.count();

    const dashboardData = {
      success: true,
      data: {
        serviceCount,
        teamMemberCount,
        galleryImageCount,
      },
    };

    return dashboardData;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
}
