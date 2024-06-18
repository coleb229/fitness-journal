import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const DeleteDataButton = ({ id, action }:any) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="hover:text-red-400">Delete</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone.  This will permanently delete the record.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <form action={action}>
                    <input type="hidden" name="id" value={id} />
                    <AlertDialogAction type="submit">Continue</AlertDialogAction>
                </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
  