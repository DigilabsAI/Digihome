import { TeamMember } from "@/components/mvpblocks/team-member-card";
import { Testimonial } from "@/components/testimonials-grid";

//Nav section

export const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export const HEADER_BRAND = {
  name: "Digilabs",
  subtitle: "Apes together strong",
};


// Hero section
export const heading = "Building digital solutions that matter.";
export const description = "One team. Many skills. Endless possibilities.";
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
        title: "Discover needs",
        content:
            "Create your MVP in record time with our pre-built blocks and components.",
        image: "/communication.svg",
    },
    {
        title: "Create the strategy",
        content:
            "Tailor every component to your needs with our intuitive design system and flexible architecture.",
        image: "/team-idea.svg",
    },
    {
        title: "Execute flawlessly",
        content:
            "Launch your product with confidence using our optimized, responsive, and accessible components.",
        image: "/idea-launch.svg",
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
export const title = "The minds behind Digilabs.";
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

//Testimonials section

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "ada-lovelace-0",
        name: "Ada Lovelace",
        role: "Frontend Engineer",
        content:
            "SmoothUI made building beautiful UI components fast and enjoyable. The docs are clear and the components are flexible.",
        avatar: "Ada Lovelace",
    },
    {
        id: "grace-hopper-1",
        name: "Grace Hopper",
        role: "Full Stack Developer",
        content:
            "I shaved hours off my development time using SmoothUI—components fit perfectly with our design system.",
        avatar: "Grace Hopper",
    },
    {
        id: "linus-torvalds-2",
        name: "Linus Torvalds",
        role: "Software Architect",
        content:
            "Stable, well-designed components that just work. Highly recommended for production apps.",
        avatar: "Linus Torvalds",
    },
    {
        id: "ada-lovelace-3",
        name: "Ada Lovelace",
        role: "Frontend Engineer",
        content:
            "SmoothUI is amazing for rapidly building UI prototypes that actually look professional.",
        avatar: "Ada Lovelace",
    },
    {
        id: "grace-hopper-4",
        name: "Grace Hopper",
        role: "Full Stack Developer",
        content:
            "The components are thoughtfully designed and flexible enough for real-world apps.",
        avatar: "Grace Hopper",
    },
    {
        id: "linus-torvalds-5",
        name: "Linus Torvalds",
        role: "Software Architect",
        content:
            "Highly recommended! The UI components are easy to integrate and very stable.",
        avatar: "Linus Torvalds",
    },
    {
        id: "ada-lovelace-6",
        name: "Ada Lovelace",
        role: "Frontend Engineer",
        content:
            "SmoothUI saved us time while keeping our UI consistent and modern.",
        avatar: "Ada Lovelace",
    },
];

//CTA section
export const CTA2Content = {
    title: "Start your project today.",
    subtitle: "Your laboratory instruments should serve you, not the other way around. We're happy to help you.",
    buttonText: "Test Your Samples",
};



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