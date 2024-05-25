import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
};

export const FormError = ({
                              message,
                          }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="bg-destructive/25 p-3 mt-4 mb-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <ExclamationTriangleIcon className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    );
};
