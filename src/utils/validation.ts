import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email tidak boleh kosong')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registrationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email tidak boleh kosong')
    .email('Format email tidak valid'),
  first_name: z
    .string()
    .min(1, 'Nama depan tidak boleh kosong'),
  last_name: z
    .string()
    .min(1, 'Nama belakang tidak boleh kosong'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter'),
  confirm_password: z
    .string()
    .min(1, 'Konfirmasi password tidak boleh kosong'),
}).refine((data) => data.password === data.confirm_password, {
  message: "Password tidak cocok",
  path: ["confirm_password"],
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
