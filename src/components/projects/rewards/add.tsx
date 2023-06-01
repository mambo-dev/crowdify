"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useForm from "../../hooks/form";
import { Input } from "../../ui/input";
import { TextArea } from "../../ui/textarea";
import { Select } from "../../ui/select";
import { z } from "zod";
import { toast } from "../../ui/toast";
import { rewardSchema } from "../../../lib/schemas/schemas";
import Button from "../../ui/button";
import { useRouter } from "next/navigation";
import addReward from "../../../app/helpers/projects/rewards/add";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project_id: number;
};

const AddRewardsModal = ({
  isOpen,
  setIsOpen,

  project_id,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const initialState: {
    rewardTitle: string;
    rewardDescription: string;
    rewardAmountRequirement: string;
    rewardStock: string;
    rewardType: "merchandise" | "early_access" | "perks";
  } = {
    rewardTitle: "",
    rewardDescription: "",
    rewardAmountRequirement: "",
    rewardStock: "",
    rewardType: "merchandise",
  };

  const router = useRouter();

  async function onSubmit(data: typeof initialState) {
    setIsLoading(true);

    try {
      const {
        rewardAmountRequirement,
        rewardDescription,
        rewardStock,
        rewardTitle,
        rewardType,
      } = rewardSchema.parse(data);

      await addReward(
        {
          rewardAmountRequirement,
          rewardDescription,
          rewardStock,
          rewardTitle,
          rewardType,
        },
        project_id
      );

      closeModal();
      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          toast({
            message: issue.message,
            title: "Invalid Input",
            type: "error",
            duration: 4000,
          });
        });
        return;
      }

      if (error instanceof Error) {
        toast({
          message: error.message,
          title: "Error",
          type: "error",
        });
        return;
      }

      toast({
        message: "something went wrong. Please try again later",
        title: "Error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const { handleChange, handleSubmit, values } = useForm(
    initialState,
    onSubmit
  );

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-start"
                  >
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add Rewards
                    </Dialog.Title>
                    <div className="mt-2 w-full flex items-center justify-center flex-col gap-3 ">
                      <div className="flex flex-col gap-2 w-full">
                        <label className="font-medium text-slate-700">
                          title
                        </label>
                        <Input
                          onChange={handleChange}
                          value={values.rewardTitle}
                          name="rewardTitle"
                          type="text"
                          className="bg-white"
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <label className="font-medium text-slate-700">
                          description
                        </label>
                        <TextArea
                          onChange={handleChange}
                          value={values.rewardDescription}
                          name="rewardDescription"
                          className="bg-white"
                        />
                      </div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-2">
                        <div className="flex flex-col gap-2 w-full">
                          <label className="font-medium text-slate-700">
                            stock
                          </label>
                          <Input
                            onChange={handleChange}
                            value={values.rewardStock}
                            name="rewardStock"
                            type="number"
                            className="bg-white"
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <label className="font-medium text-slate-700">
                            amount required
                          </label>
                          <Input
                            onChange={handleChange}
                            value={values.rewardAmountRequirement}
                            name="rewardAmountRequirement"
                            type="number"
                            className="bg-white"
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <label className="font-medium text-slate-700">
                            reward type
                          </label>
                          <Select
                            onChange={handleChange}
                            value={values.rewardType}
                            name="rewardType"
                            className="bg-white"
                            options={["merchandise", "early_access", "perks"]}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 ml-auto">
                      <Button
                        isLoading={isLoading}
                        className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      >
                        add reward
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddRewardsModal;
