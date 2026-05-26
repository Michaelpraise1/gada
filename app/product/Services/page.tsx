import Container from '@/components/Container';
import HeaderBg from '@/components/HeaderBg';
import HeadLine from '@/components/HeadLine';
import ProductMenu from '@/components/ProductMenu';
import React from 'react'

const page = () => {
  let Products = [];
  let title = "Daniels Place";
  let description = "Discover a variety of products tailored to your needs.";
  let logoUrl = "/Logo.png";
  let headerBg = "/headerbg.png";
  return (
    <Container>
      <HeaderBg imageUrl={headerBg} />
      {/* <div className='flex items-center px-3'> */}
      <HeadLine title={title} description={description} logoUrl={logoUrl} />
      {/* <SearchBar />
      </div> */}

      <ProductMenu />

    </Container>
  )
}

export default page;