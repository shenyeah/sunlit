

https://github.com/user-attachments/assets/b4b2a21b-cbfa-4d09-8475-0946cb96cb62

---

inspired by https://daylightcomputer.com/ and https://www.sunlit.place/


`matrix3d` values are calculated using the following python script:

```python
import numpy as np

def compute_homography(points_src, points_dst):
    if points_src.shape != (4, 2) or points_dst.shape != (4, 2):
        raise ValueError("Input arrays must be of shape (4,2)")

    A = np.zeros((8, 8))
    b = np.zeros(8)

    for i in range(4):
        x, y = points_src[i]
        x_prime, y_prime = points_dst[i]
        A[i * 2] = [x, y, 1, 0, 0, 0, -x * x_prime, -y * x_prime]
        b[i * 2] = x_prime
        A[i * 2 + 1] = [0, 0, 0, x, y, 1, -x * y_prime, -y * y_prime]
        b[i * 2 + 1] = y_prime

    h = np.linalg.solve(A, b)
    H = np.array([
        [h[0], h[1], 0, h[2]],
        [h[3], h[4], 0, h[5]],
        [0.0, 0.0, 1.0, 0.0],
        [h[6], h[7], 0.0, 1.0]
    ])

    return H


if __name__ == "__main__":
    src = np.array([[-1, 0], [0, 0], [0, -1], [-1, -1]]) * 500
    # day
    dst = np.array([[-1, -0.1], [0, 0], [0, -1], [-1, -1.7]]) * 500
    # night
    # dst = np.array([[-1, 0.1], [0, 0], [0, -1], [-1, -1.1]]) * 500

    # Flip y-axis in src and dst
    src[:, 1] = -src[:, 1]
    dst[:, 1] = -dst[:, 1]

    H = compute_homography(src, dst)
    print("Homography matrix:")
    print(H)

    print("Homography matrix as matrix3d in column-major order:")
    print("transform: matrix3d(")
    for col in range(4):
        values = ", ".join(f"{H[row, col]:.4f}" for row in range(4))
        print(f"    {values}," if col < 3 else f"    {values}")
    print(");")
```
