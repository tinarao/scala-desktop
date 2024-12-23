import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "@tanstack/react-form";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Priority } from "@/logic/projects";
import { toast } from "@/hooks/use-toast";

const CreateTaskDialog = ({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: number;
}) => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
    },
    onSubmit: async ({ value }) => {
      if (value.title.length > 32 || value.title.length < 3) {
        toast({
          variant: "destructive",
          title: "Некорректное название!",
          description:
            "Название задачи должно состоять минимум из двух символов и не должно превышать 32 символа!",
        });
        return;
      }

      const data = {
        ...value,
        projectId,
      };

      console.log(value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить задачу</DialogTitle>
          <DialogDescription>Добавьте задачу к проекту</DialogDescription>
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
            <form.Field name="title">
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
            <form.Field name="priority">
              {(field) => (
                <>
                  <Label>Приоритет</Label>
                  <Select
                    onValueChange={field.handleChange}
                    defaultValue={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите приоритет задачи" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Priority.Low}>Низкий</SelectItem>
                      <SelectItem value={Priority.Medium}>Средний</SelectItem>
                      <SelectItem value={Priority.High}>Высокий</SelectItem>
                      <SelectItem value={Priority.Ultra}>Ультра</SelectItem>
                    </SelectContent>
                  </Select>
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

export default CreateTaskDialog;
