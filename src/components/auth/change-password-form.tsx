"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ChangePasswordSchema } from "@/lib/schemas/auth"
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
import { changePassword } from "@/lib/services/user-settings-service"

interface ChangePasswordFormProps {
  userId: string
  hasPassword: boolean
}

type FormData = {
  currentPassword?: string
  newPassword: string
  confirmPassword: string
}

export function ChangePasswordForm({ userId, hasPassword }: ChangePasswordFormProps) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<FormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await changePassword(
        userId,
        hasPassword ? data.currentPassword! : null,
        data.newPassword
      )

      if (result.success) {
        toast.success(hasPassword ? "Contraseña actualizada" : "Contraseña establecida")
        form.reset()
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {hasPassword && (
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña actual</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
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
          {hasPassword ? "Cambiar contraseña" : "Establecer contraseña"}
        </Button>
      </form>
    </Form>
  )
} 