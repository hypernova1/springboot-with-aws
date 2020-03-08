const index = {
    init() {
        const that = this;
        document.getElementById('btn-save').addEventListener('click', () => {
            that.save();
        });
    },
    save() {
        const data = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            content: document.getElementById('content').value,
        };

        fetch('/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((data) => {
                alert('글이 등록되었습니다.');
                window.location.href = '/';
            }).catch((err) => alert(err));
    },
};

index.init();
