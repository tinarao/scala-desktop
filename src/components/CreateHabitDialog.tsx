import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "@tanstack/react-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { projectsStorage } from "@/logic/projects";
import { useToast } from "@/hooks/use-toast";
import { habitsStorage } from "@/logic/habits";

const CreateHabitDialog = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const habits = habitsStorage();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      let ok = await habits.create(value.name, value.description);
      if (!ok) {
        toast({
          title: "Не удалось добавить привычку",
          variant: "destructive",
        });
        return;
      }

      toast({ title: `У вас новая привычка - "${value.name}"!` });
      return;
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить привычку</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-2"
        >
          <div>
            <form.Field name="name">
              {(field) => (
                <>
                  <Label>
                    Название <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>
            <form.Field name="description">
              {(field) => (
                <>
                  <Label>Описание</Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>
          </div>
          <Button type="submit">Создать</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHabitDialog;
