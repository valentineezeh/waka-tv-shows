import { describe, it, beforeEach, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ShowView from "@/views/ShowView.vue";
import ShowDetails from "@/components/ShowDetails.vue";
import NotFound from "@/components/NotFound.vue";
import { useShowStore } from "@/stores/showStore";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";
import { shows } from '@/mock'

const selectedShow = shows[0];

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      currentRoute: {
        value: {
          query: {
          id: '123'
        }
        }
      }
    }))
  }
})


describe("ShowView", () => {
  let store;
  let router;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowStore();
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "home", component: HomeView },
        { path: "/show", name: "show", component: ShowView },
      ],
    });
    vi.spyOn(store, 'getSelectedShow').mockImplementation(id => {
      console.log('id >>>>> ', id)
      return Promise.resolve({
      id: parseInt(id),
      name: `Test show ${Number(id)}`}
    )
    })
  });
  it("renders ShowDetails component", async() => {
    store.selectedShow = selectedShow;
    const showView = mount(ShowView, {
      global: {
        plugins: [router],
      },
    });

    await showView.vm.$nextTick();
    const showDetails = showView.findComponent(ShowDetails);
    expect(showDetails.exists()).toBe(true);
  });
  it("renders correctly", async () => {
    store.selectedShow = selectedShow;
    const showView = mount(ShowView, {
      global: {
        plugins: [router],
      },
    });
    const ratingText = showView.findComponent(ShowDetails).text();
    expect(ratingText).toContain("Rating: 0");
  });
  it("does not render ShowDetails component when selectedShow is null", async () => {
    store.selectedShow = null;

    const showView = mount(ShowView, {
      global: {
        plugins: [router],
      },
    });
    await showView.vm.$nextTick();
    const notFound = showView.findComponent(NotFound);
    expect(notFound.exists()).toBe(true);
  });

  // it("calls getSelectedShow with the correct showId on mount", async() => {

  //   const wrapper = mount(ShowView, {
  //     global: {
  //       plugins: [router],
  //     },
  //   })
  //   await wrapper.vm.$nextTick()

  //    console.log('component instance: ', wrapper.vm)

  //   expect(store.getSelectedShow).toHaveBeenNthCalledWith('123')
  // })
});
