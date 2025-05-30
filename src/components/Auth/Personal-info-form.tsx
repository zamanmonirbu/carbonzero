/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PersonalInfoFormProps {
  onSubmit: (data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    companyLegalName: string;
  }) => void;
  isSubmitting?: boolean;
}

export default function PersonalInfoForm({
  onSubmit,
  isSubmitting = false,
}: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyLegalName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.companyLegalName.trim()) {
      newErrors.companyLegalName = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, ...submitData } = formData;
      onSubmit(submitData);
    }
  };

  return (
    <div>
      <div className="my-3 flex items-center justify-center">
        {/* <Image src="/asset/fomrLogo.png" alt="Business Consultation Logo" width={140} height={40} className="mr-2" /> */}
        <Link href="/" className="flex items-center">
          <Image
            src={"/asset/logo.png"}
            width={500}
            height={500}
            alt="logo"
            className="w-[150px]"
          />
          <p className="-ml-[30px] text-[14px] font-medium text-[#09B850]">
            {" "}
            Going 2
            <br />
            <span className={"text-gray-800"}>Zero</span>
          </p>
        </Link>
      </div>

      <div className="mx-auto max-w-md rounded-lg border border-[#09B850] p-6">
        <h1 className="mb-2 text-center text-2xl font-bold">Sign Up</h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Continue to register, Please provide the information.
        </p>

        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-lg font-semibold">
            Enter your Personal Information
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? "border-red-500" : ""}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your mail"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="companyLegalName">Company Name</Label>
              <Input
                id="companyLegalName"
                name="companyLegalName"
                placeholder="Enter your company name"
                value={formData.companyLegalName}
                onChange={handleChange}
                className={errors.companyLegalName ? "border-red-500" : ""}
              />
              {errors.companyLegalName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.companyLegalName}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 w-full bg-green-500 hover:bg-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>

          <p className="mt-4 text-center">
            Do you have account?{" "}
            <Link href="/login" className="text-green-500 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
