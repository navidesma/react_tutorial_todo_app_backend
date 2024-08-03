import { Router } from "express";
import { validate } from "../middleware/validate";
import { editUserSchema } from "../schemas/todoSchema";
import { editUser } from "../controllers/authController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/user/edit:
 *   put:
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The user was not found
 */
router.put("/edit", authenticateJWT, validate(editUserSchema), editUser);

export default router;
