"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormLayout,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPhoneNumberInput } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  nickname: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <main className="flex justify-center">
      <section className="flex w-[500px] flex-col">
        <h1 className="mt-16 text-2xl font-semibold">회원가입</h1>
        <Form {...form}>
          <FormLayout className="w-full" onSubmit={onSubmit}>
            <FormField
              name="nickname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input placeholder="닉네임" {...field} maxLength={10} />
                  </FormControl>
                  <FormDescription>닉네임을 입력해주세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="이메일" {...field} maxLength={20} />
                  </FormControl>
                  <FormDescription>이메일을 입력해주세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>전화번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="전화번호"
                      {...field}
                      onChange={(e) =>
                        onChange(formatPhoneNumberInput(e.target.value))
                      }
                      maxLength={13}
                    />
                  </FormControl>
                  <FormDescription>연락처를 입력해주세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">회원가입</Button>
          </FormLayout>
        </Form>
      </section>
    </main>
  );
};
