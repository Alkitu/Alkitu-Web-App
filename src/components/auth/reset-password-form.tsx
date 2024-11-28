"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ResetSchema } from "@/lib/schemas/auth"
import { initiatePasswordReset } from "@/lib/services/password-service"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

type FormData = {
  email: string
}

type ResetResult = {
  success: boolean;
  error?: string;
}

export function ResetPasswordForm() {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<FormData>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result: ResetResult = await initiatePasswordReset(data.email)

      if (result.success) {
        toast.success("Email de recuperación enviado")
        form.reset()
      } else {
        toast.error(result.error || "Algo salió mal")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="tu@email.com"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Enviar instrucciones
        </Button>
      </form>
    </Form>
  )
} 