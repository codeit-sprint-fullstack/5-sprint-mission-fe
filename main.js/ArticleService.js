const baseUrl = 'https://sprint-mission-api.vercel.app/articles';

export const getAticleList = async (page= 1 , pageSize = 100, keyword = '') => {
  const res = await fetch(`${baseUrl}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"},
  });
  const data = await res.json();
  return await data
  .then(data => {
    if (!data.ok) throw new Error(`Error: ${data.status}`);
    return data.json();
  })
  .catch(error => {
    console.log('Failed to fetch article list:', error);
  });
}

export const getAriticle = async (id) => {
  const res = await fetch (`${baseUrl}?id=${id}`, {
    method : "GET",
    headers : {"Content-Type" : "application/json"},
  });
  const data = await res.json();
  return  await data
  .then(data => {
    if (!data.ok) throw new Error(`Error: ${data.status}`);
    return data.json();
  })
  .catch(error => {
    console.log('게시글을 찾을 수 없음', error.message);
  });
}

export const createArticle = async (user) => {
  const res = await fetch (`${baseUrl}`, {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify({
      title : user.title.value,
      constent : user.constent.value,
      image : user.image.value
      }),
  });
  const data = await res.json();
  return await data
  .then(data => {
    if (!data.ok) throw new Error(`Error: ${data.status}`);
    return data.json();
  })
  .catch(error => {
    console.log('유효성 검사 오류', error.message);
  });
}

export const patchArticle = async (id, user) => {
  const res = await fetch (`${baseUrl}?id=${id}`, {
    method : "PATCH",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify({
      title : user.title.value,
      constent : user.constent.value,
      image : user.image.value
    }),
  });
  const data = await res.json();
  return await data
  .then(data => {
    if (!data.ok) throw new Error(`Error: ${data.status}`);
    return data.json();
  })
  .catch(error => {
    console.log('게시글을 찾을 수 없음', error.message);
  });
}

export const deleteArticle = async (id) => {
  const res = await fetch (`${baseUrl}?id=${id}`, {
    method : "DELETE",
    headers : {"Content-Type" : "application/json"},
  });
  const data = await res.json();
  return await data 
  .then(data => {
    if (!data.ok) throw new Error(`Error: ${data.status}`);
    return data.json();
  })
  .catch(error => {
    console.log('게시글을 찾을 수 없음', error.message);
  });
}
