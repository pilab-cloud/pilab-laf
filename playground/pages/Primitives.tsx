import { Cpu, Plus, Server, Trash2 } from "lucide-react";
import * as React from "react";
import {
  Accordion,
  AvatarGroup,
  ButtonGroup,
  Button,
  Chip,
  DropdownMenuItem,
  IconButton,
  PasswordField,
  RelativeTime,
  SegmentedControl,
  SelectMenu,
  Slider,
  SplitButton,
  StatusDot,
} from "../../lib";

const score = (v: string) => Math.min(4, Math.floor(v.length / 4)) as 0 | 1 | 2 | 3 | 4;

export default function Primitives() {
  const [pw, setPw] = React.useState("");
  const [range, setRange] = React.useState<number | [number, number]>([20, 60]);
  return (
    <div className="grid max-w-xl gap-6 p-6">
      <SelectMenu
        aria-label="Region"
        placeholder="Pick a region"
        options={[
          { label: "Europe", options: [{ value: "fra", label: "Frankfurt", description: "eu-central-1" }, { value: "par", label: "Paris" }] },
          { label: "US", options: [{ value: "iad", label: "Virginia", disabled: true }] },
        ]}
      />
      <SegmentedControl aria-label="View" defaultValue="list" items={[{ value: "list", label: "List" }, { value: "grid", label: "Grid" }]} />
      <div className="flex flex-wrap items-center gap-3">
        <IconButton label="Delete" icon={<Trash2 />} />
        <StatusDot tone="ok" label="Running" pulse />
        <StatusDot tone="danger" label="Failed" />
        <RelativeTime value={Date.now() - 5 * 60_000} />
        <AvatarGroup users={["Ada Lovelace", "Alan Turing", "Grace Hopper", "Linus T", "Ken Thompson"].map((name) => ({ name }))} max={3} />
      </div>
      <div className="flex items-center gap-3">
        <ButtonGroup>
          <Button variant="secondary">One</Button>
          <Button variant="secondary">Two</Button>
        </ButtonGroup>
        <SplitButton menuLabel="More power actions" menu={<DropdownMenuItem>Force off</DropdownMenuItem>}>
          <Plus aria-hidden /> Power on
        </SplitButton>
      </div>
      <PasswordField aria-label="Password" value={pw} onChange={(e) => setPw(e.target.value)} strength={score} />
      <PasswordField aria-label="Confirm password" confirmOf={pw} />
      <Accordion items={[{ id: "a", title: "First", content: "Alpha" }, { id: "b", title: "Second", content: "Beta" }]} />
      <Slider aria-label="CPU" min={0} max={100} step={5} marks={[{ value: 0 }, { value: 50 }, { value: 100 }]} defaultValue={30} withInput />
      <Slider aria-label="Range" value={range} onValueChange={setRange} />
      <div className="flex flex-wrap gap-2">
        <Chip tone="ok" icon={<Server />}>ok</Chip>
        <Chip tone="neutral" icon={<Cpu className="size-6" />} onRemove={() => {}}>big icon is clamped</Chip>
        <Chip tone="ok">ok</Chip>
        <Chip tone="warn">warn</Chip>
        <Chip tone="danger" onRemove={() => {}}>danger</Chip>
      </div>
    </div>
  );
}
