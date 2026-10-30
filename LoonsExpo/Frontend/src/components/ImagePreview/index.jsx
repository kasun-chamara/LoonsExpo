import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Box } from '@mui/material'
import localStorageService from '../../services/localStorageService'
import * as apiRoutes from '../../apiRoutes'

/**
 * ImagePreview Component
 * Developed By Roshan
 * Loons Lab
 *
 * Usage:
 * const imageData = {
 *   path: 'path/to/image',
 *   extension: 'jpg'
 * }
 *
 * <ImagePreview
 *   image_data={imageData}
 *   preview_width='100px'
 *   preview_height='100px'
 * />
 */
const ImagePreview = ({
  image_data = {},
  preview_width = '300px',
  preview_height = '300px',
  class_name = '',
  fallback_image = '/assets/images/blank-profile.png'
}) => {
  const [image_url, setImageUrl] = useState(fallback_image)

  useEffect(() => {
    const fetchImage = async () => {
      // If no image data, use fallback
      if (!image_data || !image_data.path) {
        setImageUrl(fallback_image)
        return
      }

      try {
        const accessToken = await localStorageService.getItem('accessToken')

        const uri = `${apiRoutes.FILE_VIEW}?url=${image_data.path}&type=view&extension=${image_data.extension}`

        const response = await fetch(uri, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch image')
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        setImageUrl(url)
      } catch (err) {
        console.error('Image fetch error:', err)
        setImageUrl(fallback_image)
      }
    }

    fetchImage()

    // Cleanup to revoke object URL
    return () => {
      if (image_url !== fallback_image) {
        window.URL.revokeObjectURL(image_url)
      }
    }
  }, [image_data, fallback_image])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Box
          component="img"
          className={class_name}
          src={image_url}
          sx={{
            width: preview_width,
            height: preview_height,
            objectFit: 'cover',
            borderRadius: '4px'
          }}
          alt="Preview"
        />
      </Grid>
    </Grid>
  )
}

ImagePreview.propTypes = {
  image_data: PropTypes.shape({
    path: PropTypes.string,
    extension: PropTypes.string
  }),
  preview_width: PropTypes.string,
  preview_height: PropTypes.string,
  class_name: PropTypes.string,
  fallback_image: PropTypes.string
}

export default ImagePreview
