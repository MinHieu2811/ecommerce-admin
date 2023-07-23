"use client";
import { ImageUploader } from "@/components/common";
import { AlertModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

interface SizeProps {
  initialData: Size | null;
}

type SizeValues = z.infer<typeof formSchema>;

export const SizeForm: React.FC<SizeProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<SizeValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const title = initialData ? "Edit size" : "Create size";
  const desc = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData ? "Size updated." : "size created.";
  const action = initialData ? "Save changes" : "Create size";

  const onSubmit = async (data: SizeValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params?.storeId}/sizes/${params?.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params?.storeId}/sizes`, data);
      }

      router.refresh();
      toast?.success(toastMessage);
      router?.push(`/${params?.storeId}/sizes`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params?.storeId}/sizes/${params?.sizeId}`);
      router?.refresh();
      router?.push(`/${params?.storeId}/sizes`);
      toast?.success("Size deleted.");
    } catch (error) {
      toast?.error(
        "Make sure you removed all products using this size first."
      );
    } finally {
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form?.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form?.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form?.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
