import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const CreateEpiButton = () => {

  return (
    <>
      <Link href="/epis/novo">
        <Button variant="default" className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80 border-gray-300 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2">
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          Cadastrar EPI
        </Button>
      </Link>
    </>
  );
};

export default CreateEpiButton;