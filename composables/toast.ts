export function toastSuccess(message: string, description: string) {
  const toast = useToast();
  toast.add({
    title: message,
    description: description,
    icon: 'i-heroicons-check-circle',
    color: 'green',
  })
}
