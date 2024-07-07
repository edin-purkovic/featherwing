'use client';
import * as React from 'react';
import { VariantProps, cva } from "class-variance-authority";
import { useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
	"",
	{
		variants: {
			variant: {
				default: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				ghost: "outline-none text-primary bg-background placeholder-secondary-foreground p-1 px-3 hover:bg-secondary focus:bg-secondary resize-none w-full",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

interface UseTextareaProps {
	textAreaRef: HTMLTextAreaElement | null;
	minHeight?: number;
	maxHeight?: number;
	triggerAutoSize: string;
}

export const useTextarea = ({
	textAreaRef,
	triggerAutoSize,
	maxHeight = Number.MAX_SAFE_INTEGER,
	minHeight = 0,
}: UseTextareaProps) => {
	const [init, setInit] = React.useState(true);
	React.useEffect(() => {
		// We need to reset the height momentarily to get the correct scrollHeight for the textarea
		const offsetBorder = 2;  // should it be 2 or 0?
		
		if (textAreaRef) {
			if (init) {
				textAreaRef.style.minHeight = `${minHeight + offsetBorder}px`;
				if (maxHeight > minHeight) {
					textAreaRef.style.maxHeight = `${maxHeight}px`;
				}
				setInit(false);
			}
			textAreaRef.style.height = `${minHeight + offsetBorder}px`;
			const scrollHeight = textAreaRef.scrollHeight;
			// We then set the height directly, outside of the render loop
			// Trying to set this with state or a ref will product an incorrect value.
			if (scrollHeight > maxHeight) {
				textAreaRef.style.height = `${maxHeight}px`;
			} else {
				textAreaRef.style.height = `${scrollHeight + offsetBorder}px`;
			}
		}
	}, [textAreaRef, triggerAutoSize]);
};

export type TextareaRef = {
	textArea: HTMLTextAreaElement;
	maxHeight: number;
	minHeight: number;
};

type TextareaProps = {
	maxHeight?: number;
	minHeight?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement> &  VariantProps<typeof textareaVariants>;

export const Textarea = React.forwardRef<TextareaRef, TextareaProps>(
	(
		{
			maxHeight = Number.MAX_SAFE_INTEGER,
			minHeight = 52,
			variant,
			className,
			onChange,
			value,
			...props
		}: TextareaProps,
		ref: React.Ref<TextareaRef>,
	) => {
		const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
		const [triggerAutoSize, setTriggerAutoSize] = React.useState('');

		useTextarea({
			textAreaRef: textAreaRef.current,
			triggerAutoSize: triggerAutoSize,
			maxHeight,
			minHeight,
		});

		useImperativeHandle(ref, () => ({
			textArea: textAreaRef.current as HTMLTextAreaElement,
			maxHeight,
			minHeight,
		}));

		React.useEffect(() => {
			if (value) {
				setTriggerAutoSize(value as string);
			}
		}, [value]);

		return (
			<textarea
				{...props}
				value={value}
				ref={textAreaRef}
				className={cn(textareaVariants({ variant }), className)}
				onChange={(e) => {
					setTriggerAutoSize(e.target.value);
					onChange?.(e);
				}}
			/>
		);
	},
);

Textarea.displayName = 'Textarea';
