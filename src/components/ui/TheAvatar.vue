<script setup lang="ts">
const { updateAvatar } = useUsersStore();

interface Props {
  userId: string;
}

defineProps<Props>();

const handleUploadAvatar = (event: any, userId: string) => {
  const file = event.target.files[0];
  const formData = new FormData();

  if (!file) return;
  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    return;
  }

  formData.append("file", file);
  updateAvatar(userId, formData);

  const parent = event.target.parentNode;
  const image = parent.querySelector("img");
  image.src = URL.createObjectURL(file as Blob | File);
};
</script>

<template>
  <label class="avatar">
    <img :src="`http://localhost:3000/users/${userId}/avatar`" alt="avatar" />
    <input
      type="file"
      hidden
      accept="image/png, image/jpeg"
      @change="handleUploadAvatar($event, userId)"
    />
  </label>
</template>

<style scoped lang="scss">
.avatar {
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: scale 0.3s ease;
  }

  &:hover {
    cursor: pointer;
    img {
      scale: 1.25;
    }
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: "";
    opacity: 0;
    position: absolute;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    border-radius: 50%;
    border: 4px solid rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;

    top: 0;
    left: 0;
  }
}
</style>
