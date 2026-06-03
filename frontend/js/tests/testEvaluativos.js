// "Test: Subida - Coherencia del BPM"
testUtils.createTestButton("Test subir sample con BPM erroneo", async (btn) => {

    await okLogin(); // se encuentra un error en el login, el token es invalido. 
    const token=localStorage.getItem('test_token');

    // crear formdata y blob para testear
    const formData = new FormData();
    formData.append('display_name', 'Test bpm ilogico');
    formData.append('category', 'Drums');
    formData.append('bpm', 'ciento veinte');

    const blob = new Blob(["Simulated Audio Content"], { type: 'audio/wav' });
    formData.append('audioFile', blob, 'BPM-ilogico.wav');

    const response = await fetch('/api/samples/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });

    // ubicar error y marcar como verde en caso de error 400
    const data = await response.json();
    testUtils.log(data);
    if (response.status == 400)
        testUtils.setSuccess(btn);

}); 

