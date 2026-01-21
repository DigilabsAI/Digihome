"use client";

import { Camera, CheckIcon, Loader2, PlusIcon, Save, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
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

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProfileData {
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
  socialLinks?: SocialLink[];
  roles?: string[];
  department?: string;
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

const availableRoles = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "DevOps",
  "UI/UX",
];

const departmentOptions = [
  { id: "management", label: "Management" },
  { id: "development", label: "Development" },
  { id: "design", label: "Design" },
  { id: "pentesting", label: "Pentesting" },
  { id: "qa", label: "Quality Assurance" },
];

const defaultSocialPlatforms = [
  {
    id: "twitter",
    label: "Twitter/X",
    placeholder: "https://x.com/preetsuthar17",
  },
  {
    id: "github",
    label: "GitHub",
    placeholder: "https://github.com/preetsuthar17",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/preetsuthar17",
  },
  { id: "website", label: "Website", placeholder: "https://preetsuthar.me" },
];

export default function SettingsProfile({
  profile,
  onSave,
  onAvatarUpload,
  onAvatarRemove,
  className,
}: SettingsProfileProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile?.avatar || null,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ProfileData>({
    name: profile?.name || "",
    email: profile?.email || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
    socialLinks: profile?.socialLinks || [],
    roles: profile?.roles || [], // ← add
  });

  const handleDepartmentSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, department: value }));
  };

  const defaultRoleTags = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Fullstack" },
    { id: "mobile", label: "Mobile" },
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<File | null>(null);

  const handleAvatarSelect = useCallback(
    async (file: File) => {
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
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (onAvatarUpload) {
        setIsUploadingAvatar(true);
        try {
          const avatarUrl = await onAvatarUpload(file);
          setAvatarPreview(avatarUrl);
          setErrors({});
        } catch (error) {
          setErrors({
            avatar:
              error instanceof Error
                ? error.message
                : "Failed to upload avatar",
          });
        } finally {
          setIsUploadingAvatar(false);
        }
      }
    },
    [onAvatarUpload],
  );

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarRemove = async () => {
    if (onAvatarRemove) {
      setIsUploadingAvatar(true);
      try {
        await onAvatarRemove();
        setAvatarPreview(null);
        avatarFileRef.current = null;
        setErrors({});
      } catch (error) {
        setErrors({
          avatar:
            error instanceof Error ? error.message : "Failed to remove avatar",
        });
      } finally {
        setIsUploadingAvatar(false);
      }
    } else {
      setAvatarPreview(null);
      avatarFileRef.current = null;
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

  const handleSave = async () => {
    setErrors({});

    if (!formData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (!formData.email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    if (formData.website && formData.website.trim()) {
      try {
        new URL(formData.website);
      } catch {
        setErrors({ website: "Please enter a valid URL" });
        return;
      }
    }

    setIsSaving(true);
    try {
      await onSave?.(formData);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to save profile",
      });
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

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle className="wrap-break-word">Profile Settings</CardTitle>
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
            <FieldLabel>Profile Picture</FieldLabel>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
                      alt="Profile avatar"
                      className="object-cover"
                      fill
                      sizes="96px"
                      src={avatarPreview}
                      unoptimized
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
                      onClick={handleAvatarRemove}
                      type="button"
                      variant="outline"
                    >
                      <X className="size-4" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground text-xs">
                  Drag and drop an image here, or click to browse. Max size: 5MB
                </p>
                  <a
                  href="https://faces.notion.com/"
                  target="_blank"
                  className="text-muted-foreground text-xs underline"
                >
                 Create your avatar here.
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
            <Field>
              <FieldLabel htmlFor="name">
                Name <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="name"
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    value={formData.name}
                  />
                </InputGroup>
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </FieldContent>
            </Field>

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
                </Field>
              </div>

              {/* Department */}
              <div className="flex-1">
                <Field>
                  <FieldLabel>Department</FieldLabel>
                  <FieldContent>
                    <Tags className="w-full">
                      <TagsTrigger>
                        {formData.department && (
                          <TagsValue
                            onRemove={() =>
                              setFormData((prev) => ({
                                ...prev,
                                department: undefined,
                              }))
                            }
                          >
                            {
                              departmentOptions.find(
                                (d) => d.id === formData.department,
                              )?.label
                            }
                          </TagsValue>
                        )}
                      </TagsTrigger>

                      <TagsContent>
                        <TagsList>
                          <TagsGroup>
                            {departmentOptions.map((dept) => (
                              <TagsItem
                                key={dept.id}
                                value={dept.id}
                                onSelect={() => handleDepartmentSelect(dept.id)}
                              >
                                {dept.label}
                                {formData.department === dept.id && (
                                  <CheckIcon size={14} />
                                )}
                              </TagsItem>
                            ))}
                          </TagsGroup>
                        </TagsList>
                      </TagsContent>
                    </Tags>
                  </FieldContent>
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
  );
}
