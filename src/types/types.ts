export type FormState = {
  error: string | null;
};

export type TeamMember = {
  avatar: { src: string };
  name: string;
  role: string;
  description: string;
  contributions: string[];
  github: string;
};

export type DeveloperCardProps = {
  member: TeamMember;
};
