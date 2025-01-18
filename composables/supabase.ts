import {v4 as uuid} from 'uuid';

export async function uploadImage(image: File) {
  const client = supabase()

  try {
    const { data, error} = await client.storage.from('images').upload(`${uuid()}.jpg`, image)
    if (error) {
      throw error
    }
    return data.path
  } catch (error) {
    throw error
  }
}