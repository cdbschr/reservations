<script setup lang="ts">
  import {
    ref,
    onMounted,
    onBeforeUnmount,
    computed,
    watch,
    nextTick,
  } from "vue";
  import Header from "../layouts/HeaderApp.vue";
  import Footer from "../layouts/FooterApp.vue";
  import Title from "../components/TitlePage.vue";
  import InputDate from "../components/InputDate.vue";
  import RecapDate from "../components/RecapDate.vue";

  const reservations = ref([
    {
      id: 1,
      id_user: "user1",
      placeNumber: 1,
      date_start: "2023-06-04",
      date_end: "2023-06-05",
      created_at: "2023-06-01",
      areaName: "Area 1",
    },
    {
      id: 2,
      id_user: "user2",
      placeNumber: 2,
      date_start: "2023-06-05",
      date_end: "2023-06-06",
      created_at: "2023-06-01",
      areaName: "Area 2",
    },
    {
      id: 3,
      id_user: "user3",
      placeNumber: 2,
      date_start: "2023-06-02",
      date_end: "2023-06-03",
      created_at: "2023-05-29",
      areaName: "Area 3",
    },
    {
      id: 4,
      id_user: "user4",
      placeNumber: 1,
      date_start: "2023-06-06",
      date_end: "2023-06-07",
      created_at: "2023-06-02",
      areaName: "Area 4",
    },
    {
      id: 5,
      id_user: "user5",
      placeNumber: 3,
      date_start: "2023-05-29",
      date_end: "2023-05-30",
      created_at: "2023-05-24",
      areaName: "Area 5",
    },
    {
      id: 6,
      id_user: "user6",
      placeNumber: 2,
      date_start: "2023-06-07",
      date_end: "2023-06-08",
      created_at: "2023-06-03",
      areaName: "Area 6",
    },
    {
      id: 7,
      id_user: "user7",
      placeNumber: 1,
      date_start: "2023-05-30",
      date_end: "2023-05-31",
      created_at: "2023-05-25",
      areaName: "Area 7",
    },
    {
      id: 8,
      id_user: "user8",
      placeNumber: 3,
      date_start: "2023-06-08",
      date_end: "2023-06-09",
      created_at: "2023-06-04",
      areaName: "Area 8",
    },
    {
      id: 9,
      id_user: "user9",
      placeNumber: 1,
      date_start: "2023-06-31",
      date_end: "2023-06-01",
      created_at: "2023-05-26",
      areaName: "Area 9",
    },
    {
      id: 10,
      id_user: "user10",
      placeNumber: 2,
      date_start: "2023-06-15",
      date_end: "2023-06-10",
      created_at: "2023-06-05",
      areaName: "Area 10",
    },
    {
      id: 11,
      id_user: "user11",
      placeNumber: 1,
      date_start: "2023-06-01",
      date_end: "2023-06-02",
      created_at: "2023-05-27",
      areaName: "Area 11",
    },
    {
      id: 12,
      id_user: "user12",
      placeNumber: 2,
      date_start: "2023-06-10",
      date_end: "2023-06-11",
      created_at: "2023-06-06",
      areaName: "Area 12",
    },
    {
      id: 13,
      id_user: "user13",
      placeNumber: 3,
      date_start: "2023-06-30",
      date_end: "2023-06-04",
      created_at: "2023-05-29",
      areaName: "Area 13",
    },
    {
      id: 14,
      id_user: "user14",
      placeNumber: 1,
      date_start: "2023-06-18",
      date_end: "2023-06-12",
      created_at: "2023-06-07",
      areaName: "Area 14",
    },
    {
      id: 15,
      id_user: "user15",
      placeNumber: 2,
      date_start: "2023-06-12",
      date_end: "2023-06-13",
      created_at: "2023-06-08",
      areaName: "Area 15",
    },
    {
      id: 16,
      id_user: "user16",
      placeNumber: 3,
      date_start: "2023-06-13",
      date_end: "2023-06-14",
      created_at: "2023-06-09",
      areaName: "Area 16",
    },
    {
      id: 17,
      id_user: "user17",
      placeNumber: 1,
      date_start: "2023-06-14",
      date_end: "2023-06-15",
      created_at: "2023-06-10",
      areaName: "Area 17",
    },
  ]);

  const sortedReservations = computed(() => {
    return [...reservations.value].sort((a, b) => {
      const dateA = new Date(a.date_start);
      const dateB = new Date(b.date_start);

      return dateA.getTime() - dateB.getTime();
    });
  });

  let observer: IntersectionObserver;

  const count = ref(3);
  const list = ref(sortedReservations.value.slice(0, count.value));
  const loadMoreRef = ref(null);

  watch(count, (newCount) => {
    list.value = sortedReservations.value.slice(0, newCount);
  });

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        count.value += 3;
      }
    });

    nextTick(() => {
      if (loadMoreRef.value) {
        observer.observe(loadMoreRef.value);
      }
    });

    window.addEventListener("scroll", handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const pastCounter = ref(2);
  const futureCounter = ref(2);

  const todayIndex = sortedReservations.value.findIndex(
    (reservation) => new Date(reservation.date_start) >= new Date()
  );

  const loadMorePast = () => {
    pastCounter.value = Math.min(pastCounter.value + 3, todayIndex);
  };

  const loadMoreFuture = () => {
    futureCounter.value = Math.min(
      futureCounter.value + 3,
      sortedReservations.value.length - todayIndex
    );
  };

  const pastReservations = computed(() => {
    return sortedReservations.value
      .slice(0, todayIndex)
      .slice(-pastCounter.value);
  });

  const futureReservations = computed(() => {
    return sortedReservations.value.slice(
      todayIndex,
      todayIndex + futureCounter.value
    );
  });

  const displayedReservations = computed(() => {
    return [...pastReservations.value, ...futureReservations.value];
  });

  function handleScroll() {
    const bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight;
    const topOfWindow = document.documentElement.scrollTop === 0;

    if (bottomOfWindow) {
      loadMoreFuture();
    }

    if (topOfWindow) {
      loadMorePast();
    }
  }

  const sectionClass = computed(() => {
    if (pastReservations.value.length === todayIndex) {
      return "";
    } else {
      return "mt-[-5rem]";
    }
  });
</script>

<template>
  <Header />
  <main>
    <Title text="Mes Réservations" />
    <div class="sticky top-0 bg-white z-10 p-4">
      <div class="flex items-center justify-around">
        <label for="" class="w-[45%]">Choisir une date</label>
        <InputDate name="date" class="w-[45%]" />
      </div>
    </div>
    <section :class="sectionClass">
      <RecapDate
        v-for="reservation in displayedReservations"
        :key="reservation.id"
        :reservation="reservation"
      />
    </section>
  </main>
  <Footer />
</template>
