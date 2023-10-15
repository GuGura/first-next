'use client';
import {Button, Form} from "react-bootstrap";
import {FormEvent, useState} from "react";
import {UnsplashImage} from "@/app/models/unsplash-image";
import {Alert, Spinner} from "@/app/components/bootstrap";
import Image from "next/image";
import styled from './SearchPage.module.css'

export default function SearchPage() {

  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('query')?.toString().trim();

    if (query) {
      try {
        setSearchResults(null)
        setSearchResultsLoading(true)
        setSearchResultsLoadingIsError(false)
        const response = await fetch(`/api/search?query=${query}`)
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images)
      } catch (error) {
        setSearchResultsLoadingIsError(true)
      } finally {
        setSearchResultsLoading(false)
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>.
        In order to not leak API credentials, the request is sent to
        This route handler then fetches the data  from the Unsplash API.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='search-input'>
          <Form.Label>Search query</Form.Label>
          <Form.Control name='query'
                        placeholder='Search for images'/>
        </Form.Group>
        <Button type='submit' className='mb-3' disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>

      <div className='d-flex flex-column align-items-center'>
        {searchResultsLoading && <Spinner animation='border'/>}
        {searchResultsLoadingIsError && <p>Something went wrong. Please try again</p>}
        {searchResults?.length === 0 && <p>Nothing found. Try a different query!</p>}
      </div>
      {
        searchResults &&
          <>
            {
              searchResults.map((image, i) =>
                <Image src={image.urls.raw}
                       className={styled.image}
                       width={250}
                       height={250}
                       alt={'Unsplash Imag - ' + i}
                       key={image.urls.raw}/>
              )
            }
          </>
      }
    </div>
  )
}