# FitFor

<br />

<div align="center">
  <a href="https://fit4.vercel.app/">
    <img width="full" alt="FitFor Cover" src="https://github.com/user-attachments/assets/b0418323-e44d-48dd-a6f6-70ad97f385b1" />
  </a>
</div>

<br/>

## 📖 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [팀원 및 팀소개](#-팀원-및-팀소개)
3. [주요기능](#️-주요기능)
4. [기술 스택](#️-기술-스택)
5. [아키텍처](#-아키텍처)
6. [ERD](#-erd)
7. [프로젝트 구조](#-프로젝트-구조)
8. [트러블슈팅](#-트러블슈팅)
9. [향후 목표](#-향후-목표)
10. [회고](#-회고)

## 👨‍🏫 프로젝트 소개

#### 👉 [나만의 스타일, 모두의 코디! 어떻게 입을지 고민될 땐 핏포에서 답을 찾아보세요](https://fit4.co.kr)

#### FitFor

- **프로젝트 한 줄 설명**:

  커뮤니티와 핀터레스트 같은 레퍼런스 허브 사이트의 장점을 결합한 룩북 업로드 플랫폼입니다.

- **서비스 기획 의도**:

  - **레퍼런스 허브로서의 역할**
    패션 트렌드와 본인의 독창적인 스타일을 모은 룩북 라이브러리를 제공한다는 점입니다.
    패션에 관심이 있는 사용자들은 키워드 검색, 필터링, 태그를 통해 원하는 스타일을 손쉽게 찾을 수 있습니다.
  - **커뮤니티로서의 역할**
    단순히 콘텐츠를 소비하는 것을 넘어, 누구나 본인의 패션을 업로드하고
    패션에 관한 피드백을 주고받으며 자신의 패션 포트폴리오를 구축할 수 있는 공간입니다.
  - 패션디자이너, 스타일리스트, 브랜드가 자신의 작업을 알리는 공간을 목표로 하며
    관심 있는 사용자들과 직접 소통할 수 있는 마케팅 도구와 소셜 네트워크 기능을 수행하고자 합니다.

- **기존 플랫폼의 한계**

  룩북을 모아보고 공유할 수 있는 레퍼런스 형태의 플랫폼이 없는 점에서 기획하였습니다.

## 👨‍👩‍👧‍👦 팀원 및 팀소개

어떤 상황에도 반응할 수 있는 인재들이 되고자 하는 의지의 **반응형 인재들**

<div align="center" style="display: flex; justify-content: center;">
  <table style="width: 90%; text-align: center; table-layout: fixed;">
    <thead>
      <tr>
        <th style="text-align: center;"><strong>양성훈</strong></th>
        <th style="text-align: center;"><strong>엄정은</strong></th>
        <th style="text-align: center;"><strong>임지영</strong></th>
        <th style="text-align: center;"><strong>박채현</strong></th>
        <th style="text-align: center;"><strong>김지영</strong></th>
        <th style="text-align: center;"><strong>이홍원</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="https://github.com/yangsunghun">
            <img src="https://github.com/user-attachments/assets/439e16dd-9442-496a-b036-62e512128a47" width="100px;" alt="양성훈"/>
          </a>
        </td>
        <td>
          <a href="https://github.com/ovezen">
            <img src="https://github.com/user-attachments/assets/81709e79-194b-4c49-b516-d2656eb41d15" width="100px;" alt="엄정은"/>
          </a>
        </td>
        <td>
          <a href="https://github.com/reizvoll">
            <img src="https://github.com/user-attachments/assets/ebbdfb9f-d878-4c49-813f-228b340c2769" width="100px;" alt="임지영"/>
          </a>
        </td>
        <td>
          <a href="https://github.com/chay140">
            <img src="https://github.com/user-attachments/assets/a245aba4-a826-4e7e-878e-89da498d7186" width="100px;" alt="박채현"/>
          </a>
        </td>
        <td>
          <img src="https://github.com/user-attachments/assets/ba74e032-2388-4910-acdf-c92d4ad230df" width="100px;" alt="김지영"/>
        </td>
        <td>
          <img src="https://github.com/user-attachments/assets/8926013a-144a-4db2-8023-dff6fd57892e" width="100px;" alt="양홍원"/>
        </td>
      </tr>
      <tr>
        <td><strong>팀장</strong></td>
        <td><strong>부팀장</strong></td>
        <td><strong>팀원</strong></td>
        <td><strong>팀원</strong></td>
        <td><strong>디자이너</strong></td>
        <td><strong>디자이너</strong></td>
      </tr>
      <tr>
        <td>홈페이지, 검색페이지, 상세페이지, 북마크페이지</td>
        <td>채팅 기능, 채팅 페이지</td>
        <td>작성페이지, 수정페이지</td>
        <td>로그인/온보딩 페이지, 마이페이지</td>
        <td>웹/모바일 UI/UX 디자이너</td>
        <td>웹/모바일 UI/UX 디자이너</td>
      </tr>
      <tr>
        <td><strong>"We were good team"</strong></td>
        <td><strong>"밥 먹고 오세요"</strong></td>
        <td><strong>"튜터 아닙니다"</strong></td>
        <td><strong>"감자, MashedPotato되다"</strong></td>
        <td><strong>"햄부기햄북햄북스딱스"</strong></td>
        <td><strong>"기억하세요 개구리 자세"</strong></td>
      </tr>
    </tbody>
  </table>
</div>

#### [🎨 반응형 인재들 노션 바로가기](https://www.notion.so/teamsparta/3-48193215cc7a42e98a9ca0afefcab302)

## 🕹️ 주요기능

### 메인 페이지

![Home](https://github.com/user-attachments/assets/aed4bc7d-28d0-4692-b9fd-e77b86cf8611)

### 검색 페이지

![Search](https://github.com/user-attachments/assets/b8a896bf-cfa3-499d-804e-9217b8875149)

### 상세 페이지

![Details](https://github.com/user-attachments/assets/04207e15-b933-4d29-82ff-fc350a1adbba)

### 작성 페이지

![Write](https://github.com/user-attachments/assets/d0091a21-c013-4a11-ae3c-f17e0158659d)

### 코칭 페이지

![Coaching](https://github.com/user-attachments/assets/80fa6e32-25c1-4b58-b5bd-30a6710357bd)
![Chatting](https://github.com/user-attachments/assets/457f4e2e-8dc2-49ae-b042-98fa8f4c56fb)

### 로그인/온보딩

![Login/Onboard](https://github.com/user-attachments/assets/b6c429ea-0ae1-483f-b303-1fdb077d48a9)

### 마이 페이지

![MyPage](https://github.com/user-attachments/assets/3300ca8c-ee47-49cd-ab4d-08376ddd57dc)

## ⚙️ 기술 스택

#### ✔️ 프레임워크 및 라이브러리

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/Tanstack_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
![Zod](https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![TailwindCss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PhosphorIcons](https://img.shields.io/badge/Phosphor_Icons-A4B55B?style=for-the-badge&logo=phosphor-icons&logoColor=white)
![ShadCn](https://img.shields.io/badge/ShadCN-000000?style=for-the-badge&logo=shadcn&logoColor=white)
![KakaoMap](https://img.shields.io/badge/Kakao_MAP-FFEB00?style=for-the-badge&logo=kakao&logoColor=1a1a1a)

#### ✔️ 버전 컨트롤 및 배포

![Git](https://img.shields.io/badge/GIT-000000?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

#### ✔️ 데이터베이스

![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=49EB7C)

#### ✔️ 협업, 설계

![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-EC5990?style=for-the-badge&logo=figma&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)

## 🏗 아키텍처

![FitFor-Architecture](https://github.com/user-attachments/assets/4873edc0-c101-450f-88f3-4f1e542b4fe0)

## 💼 ERD

![FitFor-ERD](https://github.com/user-attachments/assets/61da1130-45c4-41ab-b08f-29bc4bccaebb)

<details>
<summary>ERD 테이블별 설명</summary>

### **1. users (사용자) 테이블**

- `id`: 사용자 고유 ID(UUID)
- `nickname`: 닉네임
- `email`: 이메일
- `profile_image`: 프로필 이미지 URL
- `created_at`: 가입일 (timestamp)
- `gender`: 성별
- `introduction`: 자기소개
- `is_verified`: 이메일 인증 여부 (bool)
- `onboard`: 온보딩 완료 여부 (bool)

**🔗 관계:**

- `users.id`는 `posts`, `comments`, `likes`, `bookmarks`, `chat_rooms`, `chat_members` 등 여러 테이블에서 외래 키(FK)로 사용됨.
- `auth.users.id`와 연결되어 있어 인증 시스템과 통합됨.

---

### **2. posts (게시글) 테이블**

- `id`: 게시글 고유 ID(UUID)
- `user_id`: 작성자 ID (FK → users.id)
- `content`: 게시글 내용 (텍스트)
- `upload_place`: 업로드 장소 (텍스트)
- `tags`: 태그 (배열 형식으로 저장 가능)
- `body_size`: 본문 크기 (숫자)
- `created_at`: 작성 시간 (timestamp)
- `view`: 조회 수 (숫자)
- `likes`: 좋아요 수 (숫자)
- `comments`: 댓글 수 (숫자)
- `images`: 이미지 URL 목록 (배열)
- `is_saved`: 저장 여부 (bool)
- `thumbnail_blur_url`: 썸네일 블러 이미지 URL

**🔗 관계:**

- `user_id`는 `users.id`를 참조함.
- `posts.id`는 `comments`, `likes`, `bookmarks`, `purchase` 테이블에서 참조됨.

---

### **3. comments (댓글) 테이블**

- `id`: 댓글 고유 ID(UUID)
- `content`: 댓글 내용
- `user_id`: 작성자 ID (FK → users.id)
- `post_id`: 게시글 ID (FK → posts.id)
- `created_at`: 작성 시간
- `updated_at`: 수정 시간

**🔗 관계:**

- `post_id`는 `posts.id`를 참조하여 특정 게시글에 대한 댓글을 저장함.
- `user_id`는 `users.id`를 참조하여 댓글 작성자를 나타냄.

---

### **4. likes (좋아요) 테이블**

- `id`: 좋아요 ID(UUID)
- `user_id`: 좋아요 누른 사용자 ID (FK → users.id)
- `post_id`: 좋아요가 눌린 게시글 ID (FK → posts.id)
- `created_at`: 좋아요 누른 시간

**🔗 관계:**

- `user_id`는 `users.id`를 참조함.
- `post_id`는 `posts.id`를 참조함.

---

### **5. bookmarks (북마크) 테이블**

- `id`: 북마크 ID(UUID)
- `user_id`: 북마크한 사용자 ID (FK → users.id)
- `post_id`: 북마크된 게시글 ID (FK → posts.id)
- `created_at`: 북마크한 시간

**🔗 관계:**

- `user_id`는 `users.id`를 참조함.
- `post_id`는 `posts.id`를 참조함.

---

### **6. purchase (구매) 테이블**

- `id`: 구매 ID(UUID)
- `post_id`: 구매와 연결된 게시글 ID (FK → posts.id)
- `title`: 상품 제목
- `description`: 상품 설명
- `image_url`: 상품 이미지 URL
- `buy_link`: 구매 링크

**🔗 관계:**

- `post_id`는 `posts.id`를 참조하여 특정 게시글에 연결됨.

---

### **7. chat_rooms (채팅방) 테이블**

- `room_id`: 채팅방 ID(UUID)
- `user_id`: 방장 또는 생성자 ID (FK → users.id)
- `room_title`: 채팅방 제목
- `room_thumbnail_url`: 채팅방 썸네일 이미지 URL
- `room_tags`: 채팅방 태그 목록
- `isActive`: 활성화 여부 (bool)
- `created_at`: 생성 시간

**🔗 관계:**

- `user_id`는 `users.id`를 참조하여 채팅방을 만든 사람을 나타냄.
- `room_id`는 `chat_members`, `chat_messages` 등과 연결됨.

---

### **8. chat_members (채팅 멤버) 테이블**

- `member_id`: 멤버 ID(UUID)
- `room_id`: 채팅방 ID (FK → chat_rooms.room_id)
- `user_id`: 사용자 ID (FK → users.id)
- `isAdmin`: 관리자 여부 (bool)
- `isActive`: 활성화 여부 (bool)
- `created_at`: 참여 시간

**🔗 관계:**

- `room_id`는 `chat_rooms.room_id`를 참조하여 특정 채팅방을 나타냄.
- `user_id`는 `users.id`를 참조하여 멤버 정보를 저장함.

---

### **9. chat_messages (채팅 메시지) 테이블**

- `message_id`: 메시지 ID(UUID)
- `room_id`: 채팅방 ID (FK → chat_rooms.room_id)
- `member_id`: 채팅 멤버 ID (FK → chat_members.member_id)
- `content`: 메시지 내용
- `image_url`: 이미지 메시지 URL
- `created_at`: 전송 시간

**🔗 관계:**

- `room_id`는 `chat_rooms.room_id`를 참조함.
- `member_id`는 `chat_members.member_id`를 참조하여 메시지 보낸 사람을 나타냄.

---

### **10. chat_favorite_rooms (즐겨찾기 채팅방) 테이블**

- `id`: 즐겨찾기 ID(UUID)
- `user_id`: 사용자 ID (FK → users.id)
- `room_id`: 채팅방 ID (FK → chat_rooms.room_id)
- `created_at`: 즐겨찾기 추가 시간

**🔗 관계:**

- `user_id`는 `users.id`를 참조함.
- `room_id`는 `chat_rooms.room_id`를 참조함.

</details>

### **📌 정리**

위 ERD를 활용해 **게시글, 댓글, 좋아요, 북마크, 구매, 채팅 시스템**이 포함된 레퍼런스겸 커뮤니티 서비스 모델을 구축했습니다.

- **게시글과 댓글, 좋아요, 북마크**는 `posts` 테이블을 중심으로 연결됩니다.
- **채팅방과 메시지, 멤버**는 `chat_rooms` 테이블을 중심으로 구조화되어 있습니다.
- `users` 테이블이 전체 시스템의 중심이며, 인증 및 관계를 관리하는 핵심 역할을 담당합니다.

## 🌳 프로젝트 구조

```
📦src
┣ 📂app
┃ ┣ 📂(auth)
┃ ┃ ┣ 📂login
┃ ┃ ┃ ┗ 📂_components
┃ ┃ ┣ 📂onboard
┃ ┃ ┃ ┗ 📂_components
┃ ┃ ┗ 📂welcome
┃ ┣ 📂@detailModal
┃ ┃ ┗ 📂(.)detail
┃ ┃   ┗ 📂[id]
┃ ┃     ┗ 📂view
┃ ┣ 📂@modal
┃ ┃ ┣ 📂(.)login
┃ ┃ ┃ ┗ 📂_components
┃ ┃ ┗ 📂(.)onboard
┃ ┃   ┗ 📂_components
┃ ┣ 📂api
┃ ┃ ┗ 📂auth
┃ ┃   ┣ 📂callback
┃ ┃   ┗ 📂delete
┃ ┣ 📂bookmark
┃ ┃ ┗ 📂_components
┃ ┣ 📂chat
┃ ┃ ┣ 📂new
┃ ┃ ┃ ┗ 📂_components
┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┗ 📂_components
┃ ┃ ┗ 📂_components
┃ ┣ 📂detail
┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┗ 📂view
┃ ┃ ┗ 📂_components
┃ ┣ 📂home
┃ ┃ ┗ 📂_components
┃ ┣ 📂mypage
┃ ┃ ┣ 📂profile-setting
┃ ┃ ┃ ┗ 📂_components
┃ ┃ ┗ 📂_components
┃ ┣ 📂profile
┃ ┃ ┣ 📂[id]
┃ ┃ ┗ 📂_components
┃ ┣ 📂search
┃ ┃ ┗ 📂_components
┃ ┣ 📂search-location
┃ ┃ ┗ 📂_components
┃ ┗ 📂write
┃   ┣ 📂[id]
┃   ┃ ┗ 📂_components
┃   ┗ 📂_components
┣ 📂archive
┃ ┣ 📂login
┃ ┃ ┗ 📂_components
┃ ┣ 📂signup
┃ ┃ ┗ 📂_components
┃ ┗ 📂write
┃   ┣ 📂hooks
┃   ┗ 📂_components
┣ 📂assets
┃ ┣ 📂fonts
┃ ┗ 📂images
┣ 📂components
┃ ┣ 📂common
┃ ┣ 📂layout
┃ ┣ 📂providers
┃ ┣ 📂shared
┃ ┗ 📂ui
┗ 📂lib
  ┣ 📂constants
  ┣ 📂hooks
  ┃ ┣ 📂bookmarks
  ┃ ┣ 📂chat
  ┃ ┣ 📂common
  ┃ ┣ 📂detail
  ┃ ┣ 📂home
  ┃ ┣ 📂location
  ┃ ┣ 📂mypage
  ┃ ┣ 📂profile
  ┃ ┣ 📂search
  ┃ ┗ 📂write
  ┣ 📂store
  ┣ 📂styles
  ┣ 📂types
  ┣ 📂utils
  ┃ ┣ 📂auth
  ┃ ┣ 📂bookmarks
  ┃ ┣ 📂chat
  ┃ ┣ 📂common
  ┃ ┣ 📂detail
  ┃ ┣ 📂mypage
  ┃ ┣ 📂post
  ┃ ┣ 📂search
  ┃ ┣ 📂supabase
  ┃ ┗ 📂write
  ┗ 📂validations
```

## 💥 트러블슈팅

### 1. 이미지 최적화

#### ⚙️ 문제 상황 및 원인 분석

저희 프로젝트에서는 초기 로딩 속도가 느리다는 피드백이 있었습니다.

다량의 이미지가 렌더링되는 시작 페이지에서 고해상도 이미지를 처리하는 과정에서 로딩이 발생하였다는 것을 깨달았습니다. 이미지가 로딩 되기 전에는 해당 공간이 비어있어, UX를 해치는 부분이 아닐 수 없었습니다.

#### 🚀 문제 해결

이를 해결하기 위해, 이미지를 로딩하기 전에 저해상도 이미지를 먼저 표시하는 블러 처리된 프리뷰(Blur Placeholder)를 도입했습니다. 원본 이미지를 업로드할 때, 서버에서 고해상도 이미지와 함께 저해상도 블러 이미지를 생성하고, 이를 Base64 URL 형식으로 변환해 제공했습니다.

이로써 사용자에게 시각적인 콘텐츠 로딩 힌트를 제공해 로딩 지연으로 인한 불편을 줄일 수 있었습니다.

이 작업을 통해 이미지 최적화가 웹 성능과 사용자 경험에 얼마나 큰 영향을 미치는지 깨달았으며, 데이터 처리와 클라이언트-서버 협업의 중요성도 깊이 느꼈습니다. 또한, 이러한 경험은 최적화된 웹 애플리케이션을 설계하는 데 필요한 기술과 사고력을 키우는 계기가 되었습니다.

![Image Optimization Comparison](https://github.com/user-attachments/assets/076a3f0e-8bc3-40a7-8e4b-d7e35c153c5a)

```ts
<Image
  src={isImgError ? sampleImage : post.images[0]}
  alt={post.content}
  {...imageProps}
  className="object-cover object-center"
  placeholder="blur"
  blurDataURL={post.thumbnail_blur_url}
  onError={() => setIsImgError(true)}
/>
```

### 2. CRUD - 작성 페이지 작업 진행: 너무 많은 useState 사용

#### ⚙️ 문제 상황 및 원인 분석

작성페이지에 유저의 입력값이 여러개다 보니 이때 이를 모두 관리하는 상태인 useState가 많이 늘어나는 문제가 발생했습니다.

1. **가독성 저하**: 상태가 많아지면 useState가 주르륵 늘어나게 되면서 코드가 복잡해지므로 코드 가독성을 떨어뜨립니다.

2. **비효율적인 렌더링**: 각각의 상태가 독립적으로 관리되어 하나의 상태만 업데이트해도 전체 컴포넌트가 비효율적으로 렌더링이 됩니다.

3. **어려운 유지보수**: 새로운 상태를 추가하거나 수정하려고 하면, useState를 개별적으로 또 추가하거나 수정해야 하므로 유지보수가 어렵습니다.

<details>
<summary><strong>이전의 많은 상태들</strong></summary>

```ts
const WritePage = () => {
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bodySize, setBodySize] = useState({ height: "", weight: "" });
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
};
```

</details>

#### 🚀 문제 해결

이를 해결하기 위해 상태를 객체로 묶어서 관리하였습니다. useState를 여러 번 쓰는 대신에, 하나의 useState로 상태를 객체로 묶어서 관리하는 방법을 채택하였습니다.

<details>
<summary><strong>개선된 코드</strong></summary>

```ts
const WritePage = () => {
  const [formState, setFormState] = useState({
    address: '',
    title: '',
    content: '',
    bodySize: { height: '', weight: '' },
    thumbnail: '',
    tags: [],
    isModalOpen: false,
  });

  const handleChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <input
        value={formState.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      {/* 다른 input 요소 */}
    </>
  );
};
```

</details>

### 3. 저장된 유저 정보 불러오기 기능 개선

#### ⚙️ 문제 상황 및 원인 분석

저희 프로젝트에서 소셜 로그인된 유저의 정보를 파악할때, 불필요한 요청을 보내게 되는 상황을 파악했습니다. 또한 회원정보가 수정되어도, 새로고침을 해야지만 변경된 프로필이 반영되는 문제를 발견했습니다.

Header에 useUser라는 커스텀 훅을 만들어 헤더가 리렌더링 될때마다 유저의 정보를 가져오는 로직을 초기에 구현하였으나 이로 인한 문제가 헤더가 리렌더링 되지 않으면 유저 정보가 업데이트 되지 않거나, 리렌더링 할때마다 불필요한 요청을 계속 보내고 있던 상황이었습니다.

<details>
<summary><strong>개선 전 코드</strong></summary>

```ts
// useUser.ts [개선 전 코드]
"use client";
import { useAuthStore } from "@/lib/store/authStore";
import { fetchUser } from "@/lib/utils/auth/auth";
import { useEffect } from "react";
export const useUser = () => {
  // 로그인된 유저가 있다면
  // 현재 유저를 store에 유저를 저장하는 로직
  const { setUser } = useAuthStore();
  useEffect(() => {
    const fetchPublicUserData = async () => {
      const user = await fetchUser();
      // zustand에 저장
      if (user) {
        setUser(user);
      }
    };
    fetchPublicUserData();
  }, [setUser]);
};

// HeaderContent.tsx
"use client";

import { useUser } from "@/lib/hooks/auth/useUser";

const HeaderContent = () => {
  useUser();

  return <p>HeaderContent</p>;
};

export default HeaderContent;
```

</details>

#### 🚀 문제 해결

zustand 하나만 전역 상태 관리에 사용하는 것이 아닌 Context API를 활용하여 `<main>`을 Provider 하나로 감싸주어 관리하였습니다.

<details>
<summary><strong>개선된 코드</strong></summary>

```ts
// 개선된 코드
"use client";

import { useAuthStore } from "@/lib/store/authStore";
import type { UserType } from "@/lib/types/auth";
import { fetchUser } from "@/lib/utils/auth/auth";
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

const AuthContext = createContext<{ user: UserType | null }>({ user: null });

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user, setUser } = useAuthStore();
  // 컨밴션 정해서 타입 지정
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 유저의 로그인 여부 파악
  useEffect(() => {
    const fetchSignedUser = async () => {
      try {
        const user = await fetchUser();
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchSignedUser();
  }, [isAuthenticated, setUser]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// 루트 layout.tsx에서...
    <html lang="ko" className="min-h-full">
      <AuthProvider>
        <TQProviders>
          <body className={`${pretendard.className} text-body text-text-04`}>
            {/* 나머지 코드 */}
          </body>
        </TQProviders>
      </AuthProvider>
    </html>
```

</details>

### 4. 비슷하지만 다른 좋아요/북마크 기능의 코드 분리

#### ⚙️ 문제 상황 및 원인 분석

처음에는 좋아요와 북마크 기능이 모두 "클릭 토글 + 낙관적 업데이트" 방식이라는 점에 치중하여 하나의 로직으로 통합해 구현했습니다. 두 기능 모두 사용자가 클릭하면 즉시 UI에 반영하고, 이후 서버 요청을 처리하는 구조였기 때문에, 하나의 훅을 만들어 "재사용성"을 높이고자 했습니다. 이렇게 하면 코드 중복을 줄이고 유지보수도 더 쉬울 것이라 생각했습니다.

그러나 이후 기능을 수정하는 과정에서 좋아요와 북마크의 미묘한 차이점이 문제로 드러났습니다. 좋아요는 단순한 ON/OFF 상태 변경뿐만 아니라, 좋아요 개수가 함께 표시되어야 했습니다. 즉, 사용자가 좋아요를 누르면 UI에서 숫자까지 즉각적으로 변경되어야 했고, 서버 요청이 실패할 경우 숫자를 원래 상태로 롤백해야 했습니다. 반면, 북마크는 숫자 개수를 표시할 필요 없이 단순히 ON/OFF 상태만 관리하면 되는 기능이었기 때문에, 좋아요처럼 숫자 변경 로직을 포함할 필요가 없었습니다.

문제는 좋아요와 북마크의 로직을 하나로 합쳐 놓았기 때문에, 좋아요 개수를 관리하는 코드가 북마크 로직에도 영향을 미쳤다는 점입니다. 북마크에는 불필요한 숫자 증가/감소 로직이 포함되었고, 이를 수정하려다 보니 코드가 점점 복잡해지고, 특정 기능만 수정하려 해도 전체 로직을 변경해야 하는 문제가 발생했습니다.

<details>
<summary><strong>개선 전 코드(한 훅에서 관리)</strong></summary>

```ts
// useToggleAction.ts
import { useAuthStore } from "@/lib/store/authStore";
import { toast } from "@/lib/utils/common/toast";
type UseToggleActionProps = {
  postId: string;
  actionHook: (
    postId: string,
    userId: string
  ) => {
    isActive: boolean;
    isPending: boolean;
    toggleAction: () => void;
    count?: number;
  };
  requireLoginMessage?: string;
};
export const useToggleAction = ({ postId, actionHook, requireLoginMessage }: UseToggleActionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;
  if (!userId) {
    return {
      isActive: false,
      isPending: false,
      count: null,
      handleClick: () => toast(requireLoginMessage || "로그인이 필요합니다", "warning")
    };
  }
  const { isActive, isPending, toggleAction, count } = actionHook(postId, userId);
  return {
    isActive,
    isPending,
    count,
    handleClick: toggleAction
  };
};
```

</details>

#### 🚀 문제 해결

좋아요와 북마크의 로직을 개별적으로 분리하며 단일 책임 원칙의 중요성을 다시금 깨닫게 되었습니다. 기능을 분리한 후에는 좋아요는 숫자 증가/감소를 포함하는 로직으로, 북마크는 단순 상태 변경 로직으로 각각 최적화할 수 있었으며, 유지보수도 훨씬 쉬워졌습니다.
이 경험을 통해, 비슷한 동작이라고 해서 무조건 하나의 로직으로 합치는 것이 아니라, 미묘한 차이를 고려해 역할을 분리하는 것이 더 유연한 구조를 만들 수 있다는 점을 배웠습니다. 앞으로는 기능을 통합하기 전에 각 기능이 완전히 동일한 책임을 가지는지, 유지보수와 확장성을 고려했을 때 별도로 분리하는 것이 더 적절한지를 먼저 고민하는 과정을 거치려고 합니다.

<details>
<summary><strong>분리된 코드</strong></summary>

```ts
// useBookmark.ts
import { toast } from "@/lib/utils/common/toast";
import { addBookmark, isPostBookmarked, removeBookmark } from "@/lib/utils/detail/bookmarkActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type BookmarkState = {
  isBookmarked: boolean;
};

export const useBookmarks = (postId: string, userId?: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["bookmarks", postId, userId || "guest"];

  // 북마크 상태 가져오기
  const { data: bookmarkData = { isBookmarked: false }, isPending } = useQuery<BookmarkState>({
    // 관련 코드
  });

  //  Mutation (항상 실행되지만, userId 없을 때는 토스트 출력)
  const mutation = useMutation({
    // 관련 코드
  });

  return {
    isBookmarked: bookmarkData.isBookmarked,
    isPending,
    toggleBookmark: () => {
      if (!userId || userId === "guest") {
        return toast("로그인 후 북마크를 추가할 수 있습니다.", "warning");
      }
      mutation.mutate(bookmarkData.isBookmarked);
    }
  };
};

// useLike.ts
import { toast } from "@/lib/utils/common/toast";
import { addLike, getLikeCount, isPostLiked, removeLike } from "@/lib/utils/detail/likeActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLike = (postId: string, userId?: string) => {
  const queryClient = useQueryClient();
  const likeStatusQueryKey = ["likes", postId, userId || "guest"];
  const likeCountQueryKey = ["likeCount", postId];

  // 좋아요 상태 가져오기
  const { data: likeData, isPending } = useQuery({
    // 관련 코드
  });

  // 좋아요 토글 Mutation (비회원 차단)
  const mutation = useMutation({
    // 관련 코드
  });

  return {
    isLiked: likeData?.isLiked || false,
    isPending,
    toggleLike: () => {
      if (!userId || userId === "guest") {
        return toast("로그인 후 좋아요를 누를 수 있습니다.", "warning");
      }
      mutation.mutate(likeData?.isLiked || false);
    }
  };
};

// 좋아요 수에 대한 코드
export function useLikeCount(postId: string | null) {
  const { data: likeCount = 0, isPending: likeCountPending } = useQuery({
    queryKey: ["likeCount", postId],
    queryFn: async () => {
      return await getLikeCount(postId!);
    },
    enabled: Boolean(postId),
    staleTime: 300000
  });

  return { likeCount, likeCountPending };
}
```

</details>

## ⏳ 향후 목표

- 로딩 UI 개선 예정입니다.
- 로그인/온보딩 라우팅의 방법의 개선이 작업을 진행할 예정입니다.
- 날씨 기반의 데이터에 따른 룩북 추천하는 기능을 추가할 예정입니다.
- 더 다양한 인증/배지 시스템 구축할 예정입니다.
- 색상 관련 검색 기능 구상 중입니다.
- 수익화까지 목표하고 있습니다.

## 🌱 회고

### 양성훈

> 검색 기능 최적화 과정에서 성능과 UX의 균형을 고려하는 중요성을 배웠고
> 상세 페이지를 개선하는 과정에서 UI를 세포화 하여 유지보수성을 고려한 설계를 체득했습니다.
> 실시간 데이터 동기화와 캐싱 전략을 적절히 조합하는것을 경험할 수 있었습니다. 그리고
> 아무리 베이직한 기능이라도, 눈만 돌리면 개선 점이 보인다는 것을 깨달았습니다.
> 다음 프로젝트에서는 UX개선과 극한의 비용 최적화를 목표로 개발해보려고 합니다.

### 엄정은

> PostgreSQL을 기반으로 하는 Supabase Realtime 기능을 활용하여 실시간 채팅 구현에 도전했습니다.
> 관계형 테이블을 설계하면서 데이터 간의 연결성에 대해 고민해볼 수 있었고, 협업을 통해 개발자와 디자이너 간 의사소통의 중요성에 대해서도 배울 수 있었습니다.
> 이러한 경험을 바탕으로 프로젝트가 진행되는 과정에서 변경사항이 생기거나, 예상치 못한 상황이 발생하더라도 개발 기간을 지키기 위한 우선순위 조정, 빠른 의사결정을 통해 적절하게 대처할 수 있을 것이라고 생각합니다.

### 임지영

> 작성페이지와 수정페이지에 임시저장 기능 및 다중업로드 기능 등 다양한 기능을 도입하여 블로그와 유사한 사용자 경험을 구현하려는 노력을 기울였습니다.
> 각 기능 구현 과정에서 발생한 여러 문제들을 해결하며, 사용자 경험과 시스템 안정성을 동시에 고려하는 방법을 배울 수 있었던 시간이었습니다.
> 이 과정에서 팀원들과의 협업 및 소통의 중요성을 재확인하며 문제 해결 능력 또한 크게 향상시킬 수 있었으며 도전적인 경험은 앞으로의 프로젝트에서 보다 효과적으로 기술적 의사결정을 내릴 수 있을 것이라 생각됩니다.

### 박채현

> 로그인의 유저 상태 관리는 예상보다 복잡했지만, 직접 시도해 보길 잘했다는 생각이 들었습니다.
> 앞으로 유저 관련 로직을 다루는 데 많은 공부가 된 시간이었습니다.
> 마이페이지 또한 이전에 구현해 본 경험이 있지만, 이번에는 규모가 커지면서 유저 정보를 불러오는 과정에서 TanStack Query을 통해 서버 상태 관리에 대한 이해도를 확실히 높일 수 있었습니다.
> 또한 이번 프로젝트에서 디자이너분들과 협업하며 의사소통과 문제 해결 능력이 향상되었음을 앞으로의 프로젝트에서 보여줄 수 있을 것이라 생각합니다.

### 김지영

> 여러 프로젝트를 진행해 보았지만, 웹/반응형 디자인도, 개발자와의 협업, 실제 구현, 그리고 QA까지.
> 모두 처음인지라 다양한 경험을 쌓고 갈 수 있어 좋았습니다.
> 특히, 2-3주가량의 짧은 시간에 웹과 앱, 두 가지 디바이스의 디자인을 해내었단 점이 스스로 놀라웠습니다.
> '협업'의 의미는 여기서 나오는 것이라고 생각합니다. '혼자'가 아닌 '함께'일 때 그 이상의 것을 가능하게 하는 힘. 한 달이라는 시간을 저와 함께 달려주셔서 감사합니다! 모두들 수고 많으셨어요 🙂

### 이홍원

> 이번 프로젝트는 개발자와의 협업을 통해 디자인을 실제 서비스로 구현하는 새로운 경험이었습니다.
> 약 5주라는 짧은 기간 동안 반응형 웹 애플리케이션을 출시하기 위해 Figma를 활용한 효율적인 커뮤니케이션과 디자인 시스템 구축에 집중했습니다.
> 또한, 사용자 테스트와 디자인 QA를 반복하며 UI/UX를 개선하는 과정이 사용자 만족도를 높이는 데 큰 영향을 미친다는 점을 다시 한번 실감했습니다.
> 이번 경험을 바탕으로 앞으로도 우리 삶을 더 개선하고, 사용자 중심적인 디자인을 하고 싶습니다.
