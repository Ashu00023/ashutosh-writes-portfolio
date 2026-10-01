export type Member = {
  initials: string;
  name: string;
  role: string;
  focus: string;
  bio?: string;
};

export const team: Member[] = [
  {
    initials: "A",
    name: "Ashutosh Mahapatra",
    role: "Founder",
    focus: "Content Strategy & Lead Editorial",
    bio: "Writer and overall architect of every engagement. Leads the research, strategy and editorial direction, and owns the final edit.",
  },
  {
    initials: "AS",
    name: "Amlan Udaya Sarangi",
    role: "Lead Front-End Developer",
    focus: "Custom HTML/CSS, UI/UX Design & Responsive Web Engineering",
  },
  {
    initials: "SR",
    name: "Soubhagya Ranjan Rout",
    role: "Technical SEO Specialist",
    focus: "Schema.org JSON-LD, Structured Data Architecture & On-Page SEO",
  },
];
