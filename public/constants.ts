import { TeamMember } from "@/components/mvpblocks/team-member-card";

// Hero section
export const heading = "Blocks built with Shadcn & Tailwind";
export const description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.";
export const reviews = {
    count: 40,
    rating: 4.9,
    avatars: [
        { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", alt: "Avatar 1" },
        { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", alt: "Avatar 2" },
        { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp", alt: "Avatar 3" },
        { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp", alt: "Avatar 4" },
        { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp", alt: "Avatar 5" },
    ],
};
export const totalClients = "40+";
export const totalProjects = "50+";




//Workflow section

export const workflow = [
    {
        title: "Build Faster",
        content:
            "Create your MVP in record time with our pre-built blocks and components.",
        image: "communication.svg",
    },
    {
        title: "Customize Easily",
        content:
            "Tailor every component to your needs with our intuitive design system and flexible architecture.",
        image: "team-idea.svg",
    },
    {
        title: "Deploy Confidently",
        content:
            "Launch your product with confidence using our optimized, responsive, and accessible components.",
        image: "idea-launch.svg",
    },
];

//Project section
export const projects = [
    {
        title: "E-Commerce Platform",
        description:
            "Full-stack online store with payment integration and inventory management",
        tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
        image:
            "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
        links: { demo: "#", github: "#" },
    },
    {
        title: "E-Commerce Platform",
        description:
            "Full-stack online store with payment integration and inventory management",
        tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
        image:
            "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
        links: { demo: "#", github: "#" },
    },
];

//Team section
export const title = "Meet the team that makes the magic happen";
export const subtitle = "Meet our diverse team of world-class creators, designers, and problem solvers.";
export const departments: { id: Department; label: string }[] = [
    { id: "management", label: "Management" },
    { id: "product", label: "Product" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
];


export const elegantTeamMembers: TeamMember[] = [
    {
        name: "Sarah Johnson",
        department: "management",
        role: "CEO & Founder",
        bio: "Visionary leader with 15+ years in tech",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        skills: ["Strategy", "Leadership", "Innovation"],
        gradient: "from-white/10 via-white/5 to-transparent",
        social: { twitter: "#", linkedin: "#", github: "#", email: "#" },
    },
    {
        name: "Michael Chen",
        department: "management",
        role: "CTO",
        bio: "Full-stack architect and AI enthusiast",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        skills: ["AI/ML", "Architecture", "Cloud"],
        gradient: "from-white/12 via-white/5 to-transparent",
        social: { twitter: "#", linkedin: "#", github: "#", email: "michael@example.com" },
    },
    {
        name: "Emily Rodriguez",
        department: "management",
        role: "Head of Design",
        bio: "Creative mind behind beautiful interfaces",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        skills: ["UI/UX", "Branding", "Motion"],
        gradient: "from-white/12 via-white/5 to-transparent",
        social: { twitter: "#", linkedin: "#", github: "#", email: "#" },
    },
    {
        name: "David Park",
        department: "management",
        role: "Lead Developer",
        bio: "Code wizard and performance optimizer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        skills: ["React", "TypeScript", "Performance"],
        gradient: "from-foreground/12 via-foreground/5 to-transparent",
        social: { twitter: "#", linkedin: "#", github: "#", email: "david@example.com" },
    },
];

//Footer section
export type Department =
    | "all"
    | "management"
    | "product"
    | "design"
    | "marketing"
    | "sales"
    | "customer"
    | "operations";


export const footerSections = [
    {
        title: "Product",
        links: [
            {
                title: "Overview",
                href: "#",
            },
            {
                title: "Features",
                href: "#",
            },
            {
                title: "Solutions",
                href: "#",
            },
            {
                title: "Tutorials",
                href: "#",
            },
            {
                title: "Pricing",
                href: "#",
            },
            {
                title: "Releases",
                href: "#",
            },
        ],
    },
    {
        title: "Resources",
        links: [
            {
                title: "Blog",
                href: "#",
            },
            {
                title: "Newsletter",
                href: "#",
            },
            {
                title: "Events",
                href: "#",
            },
            {
                title: "Help centre",
                href: "#",
            },
            {
                title: "Tutorials",
                href: "#",
            },
            {
                title: "Support",
                href: "#",
            },
        ],
    },
];