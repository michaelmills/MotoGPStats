export interface FilterDropdownProps {
    label?: string,
    options?: Array<string>;
    onChange?(s: string): void;
}