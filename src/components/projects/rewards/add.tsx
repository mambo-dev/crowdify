"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRewards: React.Dispatch<
    React.SetStateAction<
      | {
          rewardTitle: string;
          rewardDescription: string;
          rewardAmountRequirement: string;
          rewardStock: string;
          rewardType: "merchandise" | "early_access" | "perks";
          rewardsId: number;
        }[]
      | undefined
    >
  >;
  rewards:
    | {
        rewardTitle: string;
        rewardDescription: string;
        rewardAmountRequirement: string;
        rewardStock: string;
        rewardType: "merchandise" | "early_access" | "perks";
        rewardsId: number;
      }[]
    | undefined;
    project_fundraising_id:number
};

const AddRewardsModal = ({ isOpen, setIsOpen, project_fundraising_id }: Props) => {
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

  function onSubmit(data: typeof initialState) {}

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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Rewards
                  </Dialog.Title>
                  <div className="mt-2"></div>

                  <div className="mt-4 ml-auto">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      add reward
                    </button>
                  </div>
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
