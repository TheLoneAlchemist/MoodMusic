import base64
from pathlib import Path
from deepface import DeepFace
from PIL import Image
import io


def base64Toimage(encodedString, name):
    decoded_data = base64.b64decode(encodedString)
    try:
        BASE_DIR = Path(__file__).resolve().parent.parent
        # print(f'{BASE_DIR}\media\\faces\{name}.jpeg')
        # filepath = f'{BASE_DIR}\media\\faces\{name}.jpeg'

        # with open(filepath, 'wb') as f:

        #     f.write(decoded_data)
        #     f.close()
        #     return filepath
        from PIL import Image
        import io
        filepath = f"media/faces/{name}.png"
        img = Image.open(io.BytesIO(decoded_data))
        path = img.save(filepath, 'png')
        return f"faces/{name}.png"
    except Exception as e:
        print(e)
        print("Path Error!...........")
        return None


def EmotionFromImage(image):
    print(image)
    image = f'media/{image}'
    analyzeimage = DeepFace.analyze(img_path=image, actions=['emotion'])

    # print('analyze report: ', analyzeimage)
    print('dominant: ', analyzeimage[0]['dominant_emotion'])
    return analyzeimage[0]['dominant_emotion']
