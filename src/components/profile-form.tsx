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
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  nickname: z.string().optional(),
});

interface ProfileFormProps {
  nickname: string;
}

export const ProfileForm = ({ nickname }: ProfileFormProps) => {
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: nickname,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const body = JSON.stringify({
        nickname: data.nickname,
      });

      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        body: body,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      await response.json();

      await session.update();

      toast.success("프로필이 수정되었습니다.");
    } catch (error) {
      console.log(error);
    }
  });

  const submitButtonDisabled =
    !form.formState.isValid ||
    !form.formState.isDirty ||
    form.formState.isSubmitting;

  return (
    <main className="flex justify-center">
      <section className="flex w-[500px] flex-col">
        <h1 className="mt-16 text-2xl font-semibold">프로필 수정</h1>
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
            <Button type="submit" disabled={submitButtonDisabled}>
              수정하기
            </Button>
          </FormLayout>
        </Form>
      </section>
    </main>
  );
};
