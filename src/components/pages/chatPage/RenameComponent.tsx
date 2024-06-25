import { Button, Dialog, DialogContent, Input } from "@/components/ui";

interface IProps {
  isRenameModal: boolean;
  setIsRenameModal: (value: boolean) => void;
}
const RenameComponent = ({ isRenameModal, setIsRenameModal }: IProps) => {
  return (
    <Dialog open={isRenameModal}>
      <DialogContent
        removeDefaultClose={true}
        onInteractOutside={() => setIsRenameModal(false)}
        className="flex flex-col"
      >
        <div className="mb-4">Rename Component</div>
        <Input placeholder="Enter component name" />

        <div className="mt-4 flex items-center justify-end gap-3">
          <Button>Save</Button>
          <button onClick={() => setIsRenameModal(false)}>Close</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default RenameComponent;
