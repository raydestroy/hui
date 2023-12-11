package com.cbn.myapplication

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.widget.EdgeEffect
import androidx.dynamicanimation.animation.SpringAnimation
import androidx.dynamicanimation.animation.SpringForce
import androidx.recyclerview.widget.RecyclerView

class BounceRecyclerView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : RecyclerView(context, attrs, defStyleAttr) {

    init {
        edgeEffectFactory = object : RecyclerView.EdgeEffectFactory() {
            override fun createEdgeEffect(recyclerView: RecyclerView, direction: Int): EdgeEffect {
                return object : EdgeEffect(recyclerView.context) {

                    override fun onPull(deltaDistance: Float) {
                        super.onPull(deltaDistance)
                        handlePull(deltaDistance)
                    }

                    override fun onPull(deltaDistance: Float, displacement: Float) {
                        super.onPull(deltaDistance, displacement)
                        handlePull(deltaDistance)
                    }

                    private fun handlePull(deltaDistance: Float) {
                        val sign = if (direction == DIRECTION_BOTTOM) -1 else 1
                        val rotationDelta = sign * deltaDistance * OVERSCROLL_ROTATION_MAGNITUDE
                        val translationYDelta =
                            sign * recyclerView.width * deltaDistance * OVERSCROLL_TRANSLATION_MAGNITUDE
                        recyclerView.forEachVisibleHolder { holder: BounceRecyclerHolder ->
                            holder.translationY.cancel()
                            holder.itemView.translationY += translationYDelta
                        }
                    }

                    override fun onRelease() {
                        super.onRelease()
                        recyclerView.forEachVisibleHolder { holder: BounceRecyclerHolder ->
                            holder.translationY.start()
                        }
                    }

                    override fun onAbsorb(velocity: Int) {
                        super.onAbsorb(velocity)
                        val sign = if (direction == DIRECTION_BOTTOM) -1 else 1
                        val translationVelocity = sign * velocity * FLING_TRANSLATION_MAGNITUDE
                        recyclerView.forEachVisibleHolder { holder: BounceRecyclerHolder ->
                            holder.translationY
                                .setStartVelocity(translationVelocity)
                                .start()
                        }
                    }
                }
            }
        }
    }


    abstract class BounceRecyclerAdapter<VH: BounceRecyclerHolder>: Adapter<VH>()

    abstract class BounceRecyclerHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val translationY: SpringAnimation = SpringAnimation(itemView, SpringAnimation.TRANSLATION_Y)
            .setSpring(
                SpringForce()
                    .setFinalPosition(0f)
                    .setDampingRatio(SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY)
                    .setStiffness(SpringForce.STIFFNESS_LOW)
            )
    }


    companion object {

        private const val OVERSCROLL_ROTATION_MAGNITUDE = -10

        private const val OVERSCROLL_TRANSLATION_MAGNITUDE = 0.2f

        private const val FLING_TRANSLATION_MAGNITUDE = 0.5f
    }


    inline fun <reified T : ViewHolder> RecyclerView.forEachVisibleHolder(
        action: (T) -> Unit
    ) {
        for (i in 0 until childCount) {
            action(getChildViewHolder(getChildAt(i)) as T)
        }
    }
}