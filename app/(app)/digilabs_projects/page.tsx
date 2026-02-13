import { InfoIcon } from "lucide-react";
import ProjectList from "../AppComponents/project-list";

export default function DigilabsProjectsPage() {
 

  return (
    <div className="flex-1 w-full flex flex-col gap-12 mt-20">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center my-2">
          <InfoIcon size="16" strokeWidth={2} />
          Site Under Development. Some features may not work as expected.
        </div>
        <ProjectList
          className="max-w-5xl"
          projects={[
            {
              id: "project-1",
              name: "Q4 Website Redesign",
              description:
                "Complete redesign of company website with focus on conversion optimization, improved accessibility, and modern design patterns. Includes new CMS integration and performance improvements.",
              status: "active",
              progress: 108,
              color: "#3b82f6",
              members: [
                {
                  id: "user-1",
                  name: "Sarah Chen",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
                },
                {
                  id: "user-6",
                  name: "Marcus Rodriguez",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
                },
                {
                  id: "user-8",
                  name: "Marcus Rodriguez",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
                },
                {
                  id: "user-2",
                  name: "Marcus Rodriguez",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
                },
                {
                  id: "user-5",
                  name: "Priya Patel",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=PriyaPatel2024",
                },
              ],
              taskCount: 24,
              completedTaskCount: 16,
              createdAt: new Date("2024-05-01T00:00:00.000Z"),
              updatedAt:  new Date("2024-05-01T00:00:00.000Z"),
            },
            {
              id: "project-2",
              name: "Mobile App v2.0",
              description:
                "Major update to mobile application with new features: offline mode, push notifications, and improved performance. Targeting iOS 15+ and Android 12+.",
              status: "active",
              progress: 42,
              color: "#10b981",
              members: [
                {
                  id: "user-1",
                  name: "Sarah Chen",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
                },
                {
                  id: "user-3",
                  name: "Emily Watson",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
                },
                {
                  id: "user-5",
                  name: "Priya Patel",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=PriyaPatel2024",
                },
              ],
              taskCount: 18,
              completedTaskCount: 8,
               createdAt: new Date("2024-05-01T00:00:00.000Z"),
              updatedAt:  new Date("2024-05-01T00:00:00.000Z"),
            },
            {
              id: "project-3",
              name: "Payment System Integration",
              description:
                "Integrate Stripe and PayPal payment gateways with subscription management, invoicing, and refund handling. Includes PCI compliance audit.",
              status: "completed",
              progress: 100,
              color: "#8b5cf6",
              members: [
                {
                  id: "user-2",
                  name: "Marcus Rodriguez",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
                },
                {
                  id: "user-3",
                  name: "Emily Watson",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
                },
                {
                  id: "user-4",
                  name: "David Kim",
                  avatar:
                    "https://api.dicebear.com/9.x/glass/svg?seed=DavidKim2024",
                },
              ],
              taskCount: 14,
              completedTaskCount: 14,
              createdAt: new Date("2024-05-01T00:00:00.000Z"),
              updatedAt:  new Date("2024-05-01T00:00:00.000Z"),
            },
          ]}
        />
      </div>
    </div>
  );
}
