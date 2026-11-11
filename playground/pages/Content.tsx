import { Download, Search, Trash2 } from "lucide-react";
import * as React from "react";
import {
  ActionGroup,
  Badge,
  Button,
  Card,
  ClipboardCopy,
  CodeBlock,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  DropdownSeparator,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  FormHelperText,
  Grid,
  GridItem,
  HelperText,
  HelperTextItem,
  Input,
  MenuToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  SearchInput,
  SegmentedControl,
  SelectMenu,
  Stack,
  StackItem,
  Title,
  Toolbar,
  ToolbarActions,
  ToolbarContent,
  ToolbarDivider,
  ToolbarFilterChips,
  ToolbarGroup,
  ToolbarItem,
  type ToolbarFilter,
} from "../../lib";

const PULL = "docker pull registry.pilab.hu/team/app:1.4.2";
const YAML = ["apiVersion: v1", "kind: ConfigMap", "metadata:", "  name: demo", "data:", "  mode: production"].join("\n");

export default function ContentDemo() {
  const [filters, setFilters] = React.useState<ToolbarFilter[]>([
    { id: "r-eu", label: "eu-west", category: "Region" },
    { id: "r-us", label: "us-east", category: "Region" },
    { id: "s-up", label: "healthy", category: "Status" },
  ]);
  const [selected, setSelected] = React.useState(0);
  const [view, setView] = React.useState("list");
  const [page, setPage] = React.useState(2);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <Title headingLevel="h2" size="xl">
          Toolbar
        </Title>
        <Toolbar aria-label="Repository tools" selectedCount={selected} bulkActions={<Button variant="danger" size="sm" leftIcon={<Trash2 />}>Delete</Button>} onClearSelection={() => setSelected(0)}>
          <ToolbarContent>
            <ToolbarGroup variant="filter">
              <ToolbarItem grow>
                <SearchInput icon={<Search aria-hidden />} aria-label="Search repositories" placeholder="Search repositories" />
              </ToolbarItem>
              <SegmentedControl aria-label="View" value={view} onValueChange={setView} items={[{ value: "list", label: "List" }, { value: "grid", label: "Grid" }]} />
              <SelectMenu className="w-44" aria-label="Region" placeholder="Region" options={[{ value: "eu", label: "eu-west" }, { value: "us", label: "us-east" }]} />
            </ToolbarGroup>
            <ToolbarDivider />
            <ToolbarGroup variant="action">
              <Button size="sm" variant="secondary" onClick={() => setSelected(3)}>
                Select 3
              </Button>
              <Button size="sm" variant="secondary" leftIcon={<Download />}>
                Export
              </Button>
            </ToolbarGroup>
            <ToolbarGroup variant="pagination">
              <Pagination page={page} pageCount={9} total={87} pageSize={10} onPageChange={setPage} />
            </ToolbarGroup>
          </ToolbarContent>
          <ToolbarFilterChips filters={filters} onRemove={(f) => setFilters((all) => all.filter((x) => x.id !== f.id))} onClearAll={() => setFilters([])} />
        </Toolbar>
        <Toolbar>
          <ToolbarActions
            label="Overflowing actions"
            items={["Start", "Stop", "Restart", "Clone", "Migrate", "Snapshot"].map((l) => ({ id: l, label: l, onSelect: () => {} }))}
            className="max-w-xs"
          />
        </Toolbar>
      </section>

      <section className="space-y-3">
        <Title headingLevel="h2" size="xl">
          Description list, code & clipboard
        </Title>
        <Grid>
          <GridItem md={6}>
            <Card className="p-4">
              <DescriptionList layout="grid" columns={2}>
                {[
                  ["Registry", "registry.pilab.hu"],
                  ["Owner", "platform-team"],
                  ["Visibility", "private"],
                  ["Tags", "14"],
                ].map(([t, d]) => (
                  <DescriptionListGroup key={t}>
                    <DescriptionListTerm>{t}</DescriptionListTerm>
                    <DescriptionListDescription>{d}</DescriptionListDescription>
                  </DescriptionListGroup>
                ))}
              </DescriptionList>
              <Divider className="my-4" />
              <DescriptionList layout="horizontal" compact>
                <DescriptionListGroup>
                  <DescriptionListTerm>Digest</DescriptionListTerm>
                  <DescriptionListDescription mono>sha256:9f2c…e41a</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                  <DescriptionListTerm>Size</DescriptionListTerm>
                  <DescriptionListDescription>48.2 MB</DescriptionListDescription>
                </DescriptionListGroup>
              </DescriptionList>
            </Card>
          </GridItem>
          <GridItem md={6}>
            <Stack gap="sm">
              <StackItem>
                <ClipboardCopy readOnly value={PULL} label="Pull command" />
              </StackItem>
              <StackItem>
                <ClipboardCopy variant="expandable" readOnly value={YAML} label="Manifest" defaultExpanded />
              </StackItem>
              <StackItem>
                <ClipboardCopy variant="inline-compact" value="v1.4.2" />
              </StackItem>
            </Stack>
          </GridItem>
          <GridItem>
            <CodeBlock code={YAML} language="yaml" lineNumbers wrapToggle actions={<Badge tone="primary">read-only</Badge>} />
          </GridItem>
        </Grid>
      </section>

      <section className="space-y-3">
        <Title headingLevel="h2" size="xl">
          Layout
        </Title>
        <Flex justify="between" align="center">
          <FlexItem>
            <Title headingLevel="h3" size="lg">
              Flex + Divider
            </Title>
          </FlexItem>
          <Flex gap="xs" wrap={false} align="center">
            <Badge>one</Badge>
            <Divider orientation="vertical" className="h-4" />
            <Badge>two</Badge>
          </Flex>
        </Flex>
        <Grid>
          <GridItem span={12} sm={6} lg={3}>
            <Card className="p-3">span 12 / 6 / 3</Card>
          </GridItem>
          <GridItem span={12} sm={6} lg={3}>
            <Card className="p-3">span 12 / 6 / 3</Card>
          </GridItem>
          <GridItem span={12} lg={6}>
            <Card className="p-3">span 12 / 6</Card>
          </GridItem>
        </Grid>
      </section>

      <section className="space-y-3">
        <Title headingLevel="h2" size="xl">
          Form, dropdown & modal
        </Title>
        <Form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
          <FormGroup label="Token name" fieldId="c-name" required>
            <Input id="c-name" defaultValue="ci" />
            <FormHelperText>
              <HelperText>
                <HelperTextItem>Shown in the audit log.</HelperTextItem>
                <HelperTextItem variant="error">Names must be unique.</HelperTextItem>
              </HelperText>
            </FormHelperText>
          </FormGroup>
          <ActionGroup>
            <Button type="submit">Create</Button>
            <Dropdown toggle={<MenuToggle>More</MenuToggle>}>
              <DropdownList>
                <DropdownItem>Duplicate</DropdownItem>
                <DropdownSeparator />
                <DropdownItem danger>Delete</DropdownItem>
              </DropdownList>
            </Dropdown>
            <Button variant="secondary" onClick={() => setOpen(true)}>
              Open modal
            </Button>
          </ActionGroup>
        </Form>
        <Modal open={open} onOpenChange={setOpen} size="sm">
          <ModalHeader title="Create token" description="Tokens can be revoked at any time." />
          <ModalBody>
            <FormGroup label="Name" fieldId="m-name">
              <Input id="m-name" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Create</Button>
          </ModalFooter>
        </Modal>
      </section>
    </div>
  );
}
