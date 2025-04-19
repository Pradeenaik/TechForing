"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/auth-service";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (data.success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. Please login.",
        });
        router.push("/auth/login");
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again with different credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <Card className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <CardHeader className="!border-none text-center mb-6">
          <CardTitle className="!border-none text-3xl font-semibold text-gray-800">Create an Account</CardTitle>
          <CardDescription className="!border-none text-sm text-gray-500">Enter your details to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="!border-none space-y-6">
          <CardContent className="!border-none">
            <div className="!border-none space-y-4">
              <div className="!border-none">
                <Label htmlFor="name" className="!border-none block text-sm font-medium text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="!border-none">
                <Label htmlFor="email" className="!border-none block text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="!border-none">
                <Label htmlFor="password" className="!border-none block text-sm font-medium text-gray-700">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="!border-none">
                <Label htmlFor="confirmPassword" className="!border-none block text-sm font-medium text-gray-700">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="!border-none flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg p-3 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>
            <p className="!border-none text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="!border-none text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
