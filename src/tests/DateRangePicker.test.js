import { mount } from "@vue/test-utils";
import DateRangePicker from "../components/ui/DateRangePicker.vue";

describe("DateRangePicker.vue", () => {
  const mountComponent = (props = {}) =>
    mount(DateRangePicker, {
      props,
      global: {
        stubs: {
          VueDatePicker: {
            template: "<div class='stub-date-picker'></div>",
            name: "VueDatePicker",
          },
        },
      },
    });

  it("renders correctly with title and VueDatePicker", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Mikor szeretne autót?");
    expect(wrapper.find(".stub-date-picker").exists()).toBe(true);
  });

  it("applies 'is-invalid' class and shows message when prop isInvalid=true", () => {
    const wrapper = mountComponent({ isInvalid: true });

    const datePicker = wrapper.find(".stub-date-picker");
    expect(datePicker.exists()).toBe(true);
    expect(wrapper.text()).toContain(
      "Válassza ki a dátumot mikor szeretne autót foglalni!"
    );
  });

  it("emits 'dates-changed' and resets isInvalid on handleUpdate", async () => {
    const wrapper = mountComponent({ isInvalid: true });

    const start = new Date(2025, 0, 1);
    const end = new Date(2025, 0, 5);

    await wrapper.vm.handleUpdate([start, end]);

    expect(wrapper.emitted("dates-changed")).toBeTruthy();
    expect(wrapper.emitted("dates-changed")[0]).toEqual([start, end]);
    expect(wrapper.vm.isInvalid).toBe(false);
  });

  it("updates isInvalid ref when prop changes", async () => {
    const wrapper = mountComponent({ isInvalid: false });
    expect(wrapper.vm.isInvalid).toBe(false);

    await wrapper.setProps({ isInvalid: true });
    expect(wrapper.vm.isInvalid).toBe(true);
  });

  it("v-model updates 'dates' when VueDatePicker emits 'update:model-value'", async () => {
    const wrapper = mountComponent();
    const datePicker = wrapper.findComponent({ name: "VueDatePicker" });

    const newDates = [new Date(2025, 0, 1), new Date(2025, 0, 5)];
    await datePicker.vm.$emit("update:model-value", newDates);

    expect(wrapper.vm.dates).toEqual(newDates);
  });

  it("handleUpdate emits 'dates-changed' and resets isInvalid", async () => {
    const wrapper = mountComponent({ isInvalid: true });
    const newDates = [new Date(2025, 0, 1), new Date(2025, 0, 5)];

    await wrapper.vm.handleUpdate(newDates);

    expect(wrapper.emitted("dates-changed")[0]).toEqual(newDates);
    expect(wrapper.vm.isInvalid).toBe(false);
  });
});
