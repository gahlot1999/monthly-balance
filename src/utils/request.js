const headers = {
  'Content-Type': 'application/json',
};

async function getRequest({ url }) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok && data.request.status === 'success') {
      return data?.response?.data;
    } else if (
      data.request.status === 'error' ||
      data.request.status === 'fail'
    ) {
      throw new Error(data.response.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function postRequest({ url, additionalHeaders, data }) {
  const mergedHeaders = { ...headers, ...additionalHeaders };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: mergedHeaders,
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.ok && responseData.request.status === 'success') {
      return responseData?.response?.data;
    } else if (
      responseData.request.status === 'error' ||
      responseData.request.status === 'fail'
    ) {
      throw new Error(responseData.response.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function putRequest({ url, additionalHeaders, data }) {
  const mergedHeaders = { ...headers, ...additionalHeaders };
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: mergedHeaders,
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.ok && responseData.request.status === 'success') {
      return responseData?.response?.data;
    } else if (
      responseData.request.status === 'error' ||
      responseData.request.status === 'fail'
    ) {
      throw new Error(responseData.response.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function deleteRequest({ url }) {
  try {
    const response = await fetch(url, { method: 'DELETE' });
    if (response.status !== 204) {
      const data = await response.json();
      throw new Error(data.response.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export { getRequest, postRequest, deleteRequest, putRequest };
