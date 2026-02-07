"use client";

import {
  Banner,
  BannerAction,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/banner";
import { CircleAlert } from "lucide-react";
import { Camera, CheckIcon, Loader2, PlusIcon, Save, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/app/(app)/AppComponents/input-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/kibo-ui/tags";
import { z } from "zod";
import { toast } from "sonner";
import {
  removeAvatar,
  saveProfile,
  uploadAvatar,
} from "@/lib/actions/profileActions";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProfileData {
  name: string;
  title: string;
  username: string;
  email: string;
  bio: string;
  avatar_url?: string;
  socialLinks?: SocialLink[];
  roles?: string[];
}

export interface SettingsProfileProps {
  profile?: ProfileData;
  onSave?: (data: ProfileData) => Promise<void>;
  onEmailChange?: (newEmail: string, currentPassword: string) => Promise<void>;
  onAvatarUpload?: (file: File) => Promise<string>;
  onAvatarRemove?: () => Promise<void>;
  className?: string;
  showEmailVerification?: boolean;
}

const departmentOptions = [
  { id: "Frontend Engineer", label: "Frontend Engineer" },
  { id: "Backend Architect", label: "Backend Architect" },
  { id: "UI/UX Designer", label: "UI/UX Designer" },
  { id: "Cloud Engineer", label: "Cloud Engineer" },
  { id: "QA Engineer", label: "QA Engineer" },
  { id: "Bug Slayer", label: "Bug Slayer" },
  { id: "Lightmode User", label: "Lightmode User" },
];

const defaultSocialPlatforms = [
  {
    id: "twitter",
    label: "Twitter/X",
    placeholder: "https://x.com/example",
  },
  {
    id: "github",
    label: "GitHub",
    placeholder: "https://github.com/example",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/example",
  },
  {
    id: "website",
    label: "Personal Website",
    placeholder: "https://example.dev",
  },
];

const DEFAULT_AVATAR_URL =
  "https://phxxpovjltygyxmctbfy.supabase.co/storage/v1/object/public/avatars/Default/DefaultAvatar.png";

// Zod schema
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  bio: z
    .string()
    .min(1, "Bio is required")
    .max(75, "Bio must be less than 75 characters"),
  website: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        (() => {
          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        })(),
      { message: "Please enter a valid URL" },
    ),
  roles: z.array(z.string()).min(1, "Select at least one role"),
  department: z.string().min(1, "Department is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(25, "Username must be less than 25 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Only lowercase letters, numbers, and underscores are allowed",
    )
    .refine((val) => val !== "update", {
      message: 'Username cannot be "update"',
    }),
});

const DEFAULT_PROFILE: ProfileData = {
  name: "",
  username: "",
  email: "",
  bio: "",
  title: "",
  avatar_url: "",
  socialLinks: [],
  roles: [],
};

const generateUsername = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

export default function SettingsProfile({
  profile,
  className,
}: SettingsProfileProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile?.avatar_url || DEFAULT_AVATAR_URL,
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [usernameEdited, setUsernameEdited] = useState(false);

  const [formData, setFormData] = useState<ProfileData>({
    ...DEFAULT_PROFILE,
    ...profile,
  });

  const handleDepartmentSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, title: value }));
  };

  const defaultRoleTags = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Fullstack" },
    { id: "mobile", label: "Mobile" },
    { id: "project-manager", label: "Project Manager" },
    { id: "devops", label: "DevOps" },
    { id: "uiux", label: "UI/UX" },
  ];

  const [roleTags, setRoleTags] =
    useState<{ id: string; label: string }[]>(defaultRoleTags);

  const [newRole, setNewRole] = useState("");

  const selectedRoles = formData.roles || [];

  const handleRoleRemove = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: (prev.roles || []).filter((r) => r !== value),
    }));
  };

  const handleRoleSelect = (value: string) => {
    setFormData((prev) => {
      const roles = prev.roles || [];

      if (roles.includes(value)) {
        return { ...prev, roles: roles.filter((r) => r !== value) };
      }
      if (roles.length >= 2) return prev;

      return { ...prev, roles: [...roles, value] };
    });
  };

  const handleCreateRole = () => {
    if ((formData.roles?.length || 0) >= 2 || !newRole.trim()) return;

    setRoleTags((prev) => [...prev, { id: newRole, label: newRole }]);
    setFormData((prev) => ({
      ...prev,
      roles: [...(prev.roles || []), newRole],
    }));
    setNewRole("");
  };

  const [departmentTags, setDepartmentTags] = useState(departmentOptions);
  const [newDepartment, setNewDepartment] = useState("");

  const handleCreateDepartment = () => {
    if (!newDepartment.trim()) return;

    const newTag = { id: newDepartment, label: newDepartment };
    setDepartmentTags((prev) => [...prev, newTag]);
    setFormData((prev) => ({ ...prev, department: newTag.id }));
    setNewDepartment("");
  };

useEffect(() => {
  if (!profile) {
    setFormData(DEFAULT_PROFILE);
    setAvatarPreview(DEFAULT_AVATAR_URL);
    return;
  }

  const mergedFormData = { ...DEFAULT_PROFILE, ...profile };
  setFormData(mergedFormData);
  setAvatarPreview(profile.avatar_url ?? DEFAULT_AVATAR_URL);

  // Deduplicate and add department
  if (mergedFormData.title) {
    setDepartmentTags((prev) => {
      if (!prev.find((d) => d.id === mergedFormData.title)) {
        return [...prev, { id: mergedFormData.title, label: mergedFormData.title }];
      }
      return prev;
    });
  }

  // Deduplicate and add roles
  (mergedFormData.roles || []).forEach((role) => {
    setRoleTags((prev) => {
      if (!prev.find((r) => r.id === role)) {
        return [...prev, { id: role, label: role }];
      }
      return prev;
    });
  });
}, [profile]);



  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<File | null>(null);

  const handleAvatarSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrors({ avatar: "Please select an image file" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ avatar: "Image size must be less than 5MB" });
      return;
    }

    avatarFileRef.current = file;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploadingAvatar(true);
    try {
      const avatarUrl = await uploadAvatar(file); // ← server action
      setAvatarPreview(avatarUrl);
      setFormData((prev) => ({ ...prev, avatar: avatarUrl }));
      toast.success("Avatar uploaded successfully!");
      setErrors({});
    } catch (err) {
      setErrors({
        avatar: err instanceof Error ? err.message : "Failed to upload avatar",
      });
      toast.error(
        err instanceof Error ? err.message : "Failed to upload avatar",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarRemoveClick = async () => {
    setIsUploadingAvatar(true);
    try {
      await removeAvatar(); // ← server action
      setAvatarPreview(null);
      avatarFileRef.current = null;
      setFormData((prev) => ({ ...prev, avatar: null }));
      toast.success("Avatar removed successfully!");
      setErrors({});
    } catch (err) {
      setErrors({
        avatar: err instanceof Error ? err.message : "Failed to remove avatar",
      });
      toast.error(
        err instanceof Error ? err.message : "Failed to remove avatar",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];
      if (file) {
        handleAvatarSelect(file);
      }
    },
    [handleAvatarSelect],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleAvatarSelect(file);
      }
    },
    [handleAvatarSelect],
  );

  // ---------- HANDLE SAVE USING ZOD ----------
  const handleSave = async () => {
    setErrors({});

    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        // Map Zod messages to friendly ones
        if (key === "department")
          fieldErrors[key] = "Please select a title";
        // else if (key === "bio") fieldErrors[key] = "Please enter your bio";
        else if (key === "roles") fieldErrors[key] = "Select at least one role";
        else if (key === "website")
          fieldErrors[key] = "Please enter a valid URL";
        else fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSaving(true);
    try {
      await saveProfile({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        bio: formData.bio || "",
        socialLinks: formData.socialLinks,
        roles: formData.roles,
        title: formData.title,
      });
      toast.success("Profile saved successfully!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save profile";
      setErrors({ _general: message });
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSocialLink = (platform: string, url: string) => {
    setFormData((prev) => {
      const socialLinks = prev.socialLinks || [];
      const existingIndex = socialLinks.findIndex(
        (link) => link.platform === platform,
      );
      const updatedLinks = [...socialLinks];

      if (url.trim()) {
        if (existingIndex >= 0) {
          updatedLinks[existingIndex] = { platform, url };
        } else {
          updatedLinks.push({ platform, url });
        }
      } else if (existingIndex >= 0) {
        updatedLinks.splice(existingIndex, 1);
      }

      return { ...prev, socialLinks: updatedLinks };
    });
  };

  const getSocialLink = (platform: string): string =>
    formData.socialLinks?.find((link) => link.platform === platform)?.url || "";

  // ------------------ RENDER ------------------
  return (
    <div className="w-full">
      <Banner inset className="mb-6">
        <BannerIcon icon={CircleAlert} />
        <BannerTitle>Navbar not updating? Please refresh the page.</BannerTitle>
        <BannerClose />
      </Banner>
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <CardTitle className="wrap-break-word">
                Profile Settings
              </CardTitle>
              <CardDescription className="wrap-break-word">
                Manage your profile information and avatar
              </CardDescription>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                className="w-full sm:w-auto"
                disabled={isSaving}
                onClick={handleSave}
                type="button"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span className="whitespace-nowrap">Saving…</span>
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    <span className="whitespace-nowrap">Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {errors._general && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                <p className="text-destructive text-sm">{errors._general}</p>
              </div>
            )}

            {/* Avatar Upload */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <div
                  className={cn(
                    "relative flex size-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-colors",
                    isUploadingAvatar
                      ? "border-primary bg-primary/5"
                      : "border-muted bg-muted/30 hover:border-primary/50",
                  )}
                  onClick={handleAvatarClick}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {avatarPreview ? (
                    <>
                      <Image
                        src={avatarPreview}
                        alt="Profile avatar"
                        fill
                        sizes="96px"
                        className="object-cover"
                        loading="lazy"
                      />

                      {isUploadingAvatar && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <Loader2 className="size-6 animate-spin text-primary" />
                        </div>
                      )}
                    </>
                  ) : (
                    <Camera className="size-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      onClick={handleAvatarClick}
                      type="button"
                      variant="outline"
                    >
                      <Camera className="size-4" />
                      {avatarPreview ? "Change Photo" : "Upload Photo"}
                    </Button>
                    {avatarPreview && (
                      <Button
                        onClick={handleAvatarRemoveClick}
                        type="button"
                        variant="outline"
                      >
                        <X className="size-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Drag and drop an image here, or click to browse. Max size:
                    5MB
                  </p>
                  <a
                    href="https://faces.notion.com/"
                    target="_blank"
                    className="text-muted-foreground text-xs underline"
                  >
                    Create your avatar here https://faces.notion.com.
                  </a>
                  {errors.avatar && (
                    <p className="text-destructive text-xs">{errors.avatar}</p>
                  )}
                </div>
                <input
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                  ref={fileInputRef}
                  type="file"
                />
              </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Full Name */}
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            name,
                            username: usernameEdited
                              ? prev.username
                              : generateUsername(name),
                          }));
                        }}
                      />
                    </InputGroup>
                    {errors.name && <FieldError>{errors.name}</FieldError>}
                  </FieldContent>
                </Field>

                {/* Username */}
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="username"
                        placeholder="john_doe"
                        value={formData.username ?? ""}
                        onChange={(e) => {
                          setUsernameEdited(true); // user manually typed → stop auto-fill
                          setFormData((prev) => ({
                            ...prev,
                            username: generateUsername(e.target.value),
                          }));
                        }}
                      />
                    </InputGroup>
                    <FieldDescription>
                      Used in your profile URL
                    </FieldDescription>
                    {errors.username && (
                      <FieldError>{errors.username}</FieldError>
                    )}
                  </FieldContent>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <div className="flex flex-col gap-2">
                    <InputGroup>
                      <InputGroupInput
                        id="email"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="your.email@example.com"
                        type="email"
                        value={formData.email}
                      />
                    </InputGroup>
                  </div>
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <FieldContent>
                  <Textarea
                    id="bio"
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    placeholder="I love cats and coffee."
                    rows={4}
                    value={formData.bio}
                  />
                  <FieldDescription>
                    A brief description about yourself (1 sentence or phrase)
                  </FieldDescription>
                  {errors.bio && <FieldError>{errors.bio}</FieldError>}
                </FieldContent>
              </Field>

              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                {/* Roles */}
                <div className="flex-1">
                  <Field>
                    <FieldLabel>Roles</FieldLabel>
                    <FieldContent>
                      <Tags className="w-full">
                        <TagsTrigger>
                          {selectedRoles.map((role) => (
                            <TagsValue
                              key={role}
                              onRemove={() => handleRoleRemove(role)}
                            >
                              {roleTags.find((t) => t.id === role)?.label}
                            </TagsValue>
                          ))}
                        </TagsTrigger>

                        <TagsContent>
                          <TagsInput
                            onValueChange={setNewRole}
                            placeholder="Search or create role..."
                          />
                          <TagsList>
                            <TagsEmpty>
                              <button
                                type="button"
                                className="mx-auto flex items-center gap-2"
                                onClick={handleCreateRole}
                              >
                                <PlusIcon size={14} />
                                Create role: {newRole}
                              </button>
                            </TagsEmpty>

                            <TagsGroup>
                              {roleTags.map((tag) => (
                                <TagsItem
                                  key={tag.id}
                                  value={tag.id}
                                  onSelect={handleRoleSelect}
                                >
                                  {tag.label}
                                  {selectedRoles.includes(tag.id) && (
                                    <CheckIcon size={14} />
                                  )}
                                </TagsItem>
                              ))}
                            </TagsGroup>
                          </TagsList>
                        </TagsContent>
                      </Tags>
                    </FieldContent>
                    {errors.roles && <FieldError>{errors.roles}</FieldError>}
                  </Field>
                </div>

                {/* Department */}
                <div className="flex-1">
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <FieldContent>
                      <Tags className="w-full">
                        <TagsTrigger>
                          {formData.title && (
                            <TagsValue
                              onRemove={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  title: "",
                                }))
                              }
                            >
                              {
                                departmentTags.find(
                                  (d) => d.id === formData.title,
                                )?.label
                              }
                            </TagsValue>
                          )}
                        </TagsTrigger>

                        <TagsContent>
                          <TagsInput
                            onValueChange={setNewDepartment}
                            placeholder="Search or Create a title..."
                          />
                          <TagsList>
                            <TagsEmpty>
                              {newDepartment.trim() && (
                                <button
                                  type="button"
                                  className="mx-auto flex items-center gap-2"
                                  onClick={handleCreateDepartment}
                                >
                                  <PlusIcon size={14} />
                                  Create department: {newDepartment}
                                </button>
                              )}
                            </TagsEmpty>

                            <TagsGroup>
                              {departmentTags.map((tag) => (
                                <TagsItem
                                  key={tag.id}
                                  value={tag.id}
                                  onSelect={() =>
                                  {handleDepartmentSelect(tag.id)}
                                  }
                                >
                                  {tag.label}
                                  {formData.title === tag.id && (
                                    <CheckIcon size={14} />
                                  )}
                                </TagsItem>
                              ))}
                            </TagsGroup>
                          </TagsList>
                        </TagsContent>
                      </Tags>
                    </FieldContent>
                    {errors.department && (
                      <FieldError>{errors.department}</FieldError>
                    )}
                  </Field>
                </div>
              </div>
            </div>

            <Separator />

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <FieldLabel>Social Links</FieldLabel>
              <div className="flex flex-col gap-3">
                {defaultSocialPlatforms.map((platform) => (
                  <Field key={platform.id}>
                    <FieldLabel htmlFor={`social-${platform.id}`}>
                      {platform.label}
                    </FieldLabel>
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          id={`social-${platform.id}`}
                          onChange={(e) =>
                            updateSocialLink(platform.id, e.target.value)
                          }
                          placeholder={platform.placeholder}
                          type="url"
                          value={getSocialLink(platform.id)}
                        />
                      </InputGroup>
                    </FieldContent>
                  </Field>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
