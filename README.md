# FitFor

<br />

<div align="center">
  <a href="https://fit4.vercel.app/">
    <img width="full" alt="FitFor Cover" src="https://github.com/user-attachments/assets/05a25e16-8f36-474c-a64c-fafdac5722b9" />
  </a>
</div>

<br/>

## 📖 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [팀원 및 팀소개](#팀원-및-팀소개)
3. [아키텍처](#아키텍처)
3. [주요기능](#주요기능)
4. [적용 기술 및 기술적 의사결정](#적용-기술-및-기술적-의사결정)
5. [Trouble Shooting](#trouble-shooting)
6. [개발기간](#개발기간)
7. [기술스택](#기술스택)
8. [와이어프레임](#와이어프레임)
9. [ERD](#ERD)
10. [프로젝트 파일 구조](#프로젝트-파일-구조)

## 프로젝트 소개

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

  룩북을 모아보고 공유할 수 있는 레퍼런스 형태의 

## 팀원 및 팀소개

<div style="display: flex; justify-content: center;">
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
            <img src="https://github.com/user-attachments/assets/d982a4ae-e71e-471b-8ea1-24d2e09cb002" width="100px;" alt="임지영"/>
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
    </tbody>
  </table>
</div>

<br/>

### [📝 프로젝트 노션 바로가기](https://www.notion.so/teamsparta/3-48193215cc7a42e98a9ca0afefcab302)

<br/>

## 아키텍처
