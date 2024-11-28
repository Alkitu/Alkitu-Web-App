"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { NewPasswordSchema } from "@/lib/schemas/auth"
import { resetPassword } from "@/lib/services/password-service"
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
import { useRouter } from "next/navigation"

type FormData = {
  password: string
  confirmPassword: string
}

export function NewPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams?.get("token")
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<FormData>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: FormData) {
    if (!token) {
      toast.error("Token no válido")
      return
    }

    startTransition(async () => {
      const result = await resetPassword(token, data.password)

      if (result.success) {
        toast.success("Contraseña actualizada correctamente")
        router.push("/auth/login")
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
          name="password"
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
          Restablecer contraseña
        </Button>
      </form>
    </Form>
  )
} 